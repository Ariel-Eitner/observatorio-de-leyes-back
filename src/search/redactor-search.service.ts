import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../common/prisma/prisma.service";
import { LawsService } from "../laws/laws.service";
import { computeFrontendPath } from "../common/utils/law-url.util";
import type { Law } from "../common/types/law.types";

import { articleNumberKey } from "./article-number.util";
export { articleNumberKey } from "./article-number.util";

const provinces: Record<string, string> = {
  "buenos-aires": "Buenos Aires",
  catamarca: "Catamarca",
  chaco: "Chaco",
  chubut: "Chubut",
  caba: "Ciudad Autónoma de Buenos Aires",
  cordoba: "Córdoba",
  corrientes: "Corrientes",
  "entre-rios": "Entre Ríos",
  formosa: "Formosa",
  jujuy: "Jujuy",
  "la-pampa": "La Pampa",
  "la-rioja": "La Rioja",
  mendoza: "Mendoza",
  misiones: "Misiones",
  neuquen: "Neuquén",
  "rio-negro": "Río Negro",
  salta: "Salta",
  "san-juan": "San Juan",
  "san-luis": "San Luis",
  "santa-cruz": "Santa Cruz",
  "santa-fe": "Santa Fe",
  "santiago-del-estero": "Santiago del Estero",
  "tierra-del-fuego": "Tierra del Fuego",
  tucuman: "Tucumán",
};

type NormRow = {
  id: string;
  number: string;
  title: string;
  common_name: string | null;
  status: string;
  jurisdiction: string;
  scope_slug: string | null;
  norm_type: string;
};
export function normSuggestion(row: NormRow) {
  const scope =
    row.scope_slug || row.id.replace(/^(?:const-|constitucion-)/, "");
  let title = row.common_name || row.title;
  if (row.id === "constitucion-nacional") title = "Constitución Nacional";
  else if (scope === "caba" && /^(?:const-|constitucion-)/.test(row.id))
    title = "Constitución de la Ciudad Autónoma de Buenos Aires";
  else if (provinces[scope] && /^(?:const-|constitucion-)/.test(row.id))
    title = `Constitución de ${provinces[scope]}`;
  return {
    id: row.id,
    number: row.number || "",
    title,
    commonName: title,
    status: row.status,
    jurisdiction: row.jurisdiction,
    scope: row.scope_slug,
    normType: row.norm_type,
    url: computeFrontendPath({
      id: row.id,
      number: row.number,
      title: row.title,
    } as Law),
  };
}

/** Suggestions only: no facets, full-norm hydration, headlines, or global article fallback. */
@Injectable()
export class RedactorSearchService {
  private readonly cache = new Map<
    string,
    { value: unknown; bytes: number; expires: number }
  >();
  private readonly pending = new Map<string, Promise<unknown>>();
  private cacheBytes = 0;
  constructor(
    private readonly prisma: PrismaService,
    private readonly laws: LawsService,
  ) {}

  private async query<T>(statement: Prisma.Sql): Promise<T> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Scoped to this transaction; never changes timeouts for other workloads.
        await tx.$executeRaw`SET LOCAL statement_timeout = '2000ms'`;
        return tx.$queryRaw<T>(statement);
      }, { maxWait: 1000, timeout: 3000 });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError &&
          (['P2024', 'P2028'].includes(error.code) || error.meta?.code === '57014')) {
        throw new ServiceUnavailableException('La búsqueda demoró demasiado. Intentá nuevamente.');
      }
      throw error;
    }
  }

  private async cached<T>(key: string, load: () => Promise<T>): Promise<T> {
    const versioned = `${this.laws.getCorpusVersion()}:${key}`;
    const hit = this.cache.get(versioned);
    if (hit && hit.expires > Date.now()) {
      this.cache.delete(versioned);
      this.cache.set(versioned, hit);
      return hit.value as T;
    }
    return this.singleFlight(versioned, async () => {
      const value = await load();
      this.remember(versioned, value);
      return value;
    });
  }
  private singleFlight<T>(key: string, load: () => Promise<T>): Promise<T> {
    if (this.pending.has(key)) return this.pending.get(key) as Promise<T>;
    if (this.pending.size >= 8)
      throw new ServiceUnavailableException(
        "La búsqueda está ocupada. Intentá nuevamente.",
      );
    const request = load().finally(() => this.pending.delete(key));
    this.pending.set(key, request);
    return request;
  }
  private remember(key: string, value: unknown) {
    const bytes = Buffer.byteLength(JSON.stringify(value), "utf8");
    if (bytes > 128 * 1024) return;
    const previous = this.cache.get(key);
    if (previous) {
      this.cacheBytes -= previous.bytes;
      this.cache.delete(key);
    }
    this.cache.set(key, { value, bytes, expires: Date.now() + 15_000 });
    this.cacheBytes += bytes;
    while (this.cache.size > 64 || this.cacheBytes > 1024 * 1024) {
      const oldest = this.cache.keys().next().value as string;
      this.cacheBytes -= this.cache.get(oldest)!.bytes;
      this.cache.delete(oldest);
    }
  }

  norms(query: string, offset = 0) {
    const q = query.trim().slice(0, 120);
    return this.cached(
      `norms:${q.toLocaleLowerCase("es")}:${offset}`,
      async () => {
        const generic = /^(?:constitucion|constituciones)$/.test(
          q
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase(),
        );
        const like = `%${q.replace(/[\\%_]/g, "\\$&")}%`;
        const rows = await this.query<NormRow[]>(Prisma.sql`
        SELECT n.id, n.number, n.title, n.common_name, n.status, n.jurisdiction, n.scope_slug, n.norm_type
        FROM norms n
        WHERE n.visibility = 'PUBLICA'
          AND (${!generic} OR n.id = 'constitucion-nacional' OR n.id LIKE 'const-%' OR n.norm_type LIKE '%CONSTITUCION%')
          AND (${!q || generic} OR n.search @@ websearch_to_tsquery('spanish', immutable_unaccent(${q}))
            OR immutable_unaccent(lower(concat_ws(' ', n.title, n.common_name, n.short_code, array_to_string(n.aliases, ' '))))
              LIKE immutable_unaccent(lower(${like})))
        ORDER BY
          CASE WHEN ${generic} AND n.id = 'constitucion-nacional' THEN 0 ELSE 1 END,
          CASE WHEN ${generic} THEN CASE WHEN n.scope_slug = 'caba' OR n.id = 'const-caba' THEN 'ciudad autonoma de buenos aires'
            ELSE coalesce(n.scope_slug, regexp_replace(n.id, '^(const-|constitucion-)', '')) END END,
          CASE WHEN immutable_unaccent(lower(coalesce(n.short_code, ''))) = immutable_unaccent(lower(${q})) THEN 0 ELSE 1 END,
          CASE WHEN ${!q} AND n.is_destacada THEN 0 ELSE 1 END,
          ts_rank(n.search, websearch_to_tsquery('spanish', immutable_unaccent(${q}))) DESC,
          immutable_unaccent(lower(coalesce(n.common_name, n.title))), n.id
        LIMIT 11 OFFSET ${offset}`);
        return {
          results: rows.slice(0, 10).map(normSuggestion),
          nextOffset: rows.length > 10 ? offset + 10 : null,
          corpusVersion: this.laws.getCorpusVersion(),
        };
      },
    );
  }

  tokens() {
    return this.cached("tokens", async () => {
      const rows = await this.query<
        Array<{ token: string }>
      >(Prisma.sql`
        SELECT DISTINCT lower(replace(token, '.', '')) AS token FROM norms n
        CROSS JOIN LATERAL unnest(array_cat(ARRAY[n.number, n.short_code], n.aliases)) token
        WHERE n.visibility = 'PUBLICA' AND (token ~ '^[A-Za-z]{2,10}$' OR token ~ '^[0-9.]{3,9}$')
        ORDER BY token LIMIT 20000`);
      return {
        tokens: rows.map((row) => row.token),
        corpusVersion: this.laws.getCorpusVersion(),
      };
    });
  }

  norm(id: string) {
    return this.cached(`norm:${id}`, async () => {
      const rows = await this.query<NormRow[]>(Prisma.sql`
        SELECT id, number, title, common_name, status, jurisdiction, scope_slug, norm_type
        FROM norms WHERE id = ${id} AND visibility = 'PUBLICA' LIMIT 1`);
      if (!rows[0])
        throw new NotFoundException("La norma ya no está disponible.");
      return normSuggestion(rows[0]);
    });
  }

  articles(lawId: string, query: string, offset = 0) {
    const q = query.trim().slice(0, 120),
      number = articleNumberKey(q);
    return this.cached(
      JSON.stringify([
        "articles",
        lawId,
        number || q.toLocaleLowerCase("es"),
        offset,
      ]),
      async () => {
        const condition = this.articleCondition(q, number);
        const rank =
          q && !number
            ? Prisma.sql`ts_rank(a.search, websearch_to_tsquery('spanish', immutable_unaccent(${q}))) DESC,`
            : Prisma.empty;
        const rows = await this.query<
          Array<{
            id: string;
            lawId: string;
            number: string;
            title: string;
            order: number;
            preview: string;
            hasText: boolean;
            status: string | null;
            normStatus: string;
            derogated: boolean;
          }>
        >(Prisma.sql`
        SELECT a.id, a.norm_id AS "lawId", a.number, coalesce(a.title, '') AS title, a.ord AS "order",
          left(a.body, 160) AS preview, length(a.body) > 0 AS "hasText", a.status, n.status AS "normStatus",
          (upper(a.status) IN ('DEROGADO', 'DEROGADA') OR a.derogated_date <= (now() AT TIME ZONE 'America/Argentina/Buenos_Aires')::date OR coalesce(a.title, '') ~* 'derogad[oa]') IS TRUE AS derogated
        FROM articles a JOIN norms n ON n.id = a.norm_id
        WHERE n.id = ${lawId} AND n.visibility = 'PUBLICA' AND ${condition}
        ORDER BY ${rank} a.ord, a.id LIMIT 11 OFFSET ${offset}`);
        return {
          results: rows.slice(0, 10),
          nextOffset: rows.length > 10 ? offset + 10 : null,
          match: number ? "number" : "text",
          corpusVersion: this.laws.getCorpusVersion(),
        };
      },
    );
  }

  private articleCondition(q: string, number: string | null) {
    if (number)
      return Prisma.sql`regexp_replace(lower(immutable_unaccent(a.number)), '[^a-z0-9]', '', 'g') = ${number}`;
    if (q)
      return Prisma.sql`a.search @@ websearch_to_tsquery('spanish', immutable_unaccent(${q}))`;
    return Prisma.sql`true`;
  }

  async article(id: string, lawId: string) {
    return this.singleFlight(
      JSON.stringify(["detail", lawId, id]),
      async () => {
        // Text is always read fresh; no caching of official text or full-norm hydration.
        const rows = await this.query<
          Array<{
            id: string;
            lawId: string;
            number: string;
            title: string;
            text: string;
            status: string | null;
            normStatus: string;
            derogated: boolean;
          }>
        >(Prisma.sql`
      SELECT a.id, a.norm_id AS "lawId", a.number, coalesce(a.title, '') AS title, a.body AS text,
        a.status, n.status AS "normStatus",
        (upper(a.status) IN ('DEROGADO', 'DEROGADA') OR a.derogated_date <= (now() AT TIME ZONE 'America/Argentina/Buenos_Aires')::date OR coalesce(a.title, '') ~* 'derogad[oa]') IS TRUE AS derogated
      FROM articles a JOIN norms n ON n.id = a.norm_id
      WHERE a.id = ${id} AND a.norm_id = ${lawId} AND n.visibility = 'PUBLICA' LIMIT 1`);
        if (!rows[0])
          throw new NotFoundException(
            "El artículo ya no está disponible en esta norma.",
          );
        return rows[0];
      },
    );
  }
}
