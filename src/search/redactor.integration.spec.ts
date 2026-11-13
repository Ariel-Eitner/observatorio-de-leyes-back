import { PrismaClient } from "@prisma/client";
import { RedactorSearchService } from "./redactor-search.service";
import { SearchDbService } from "./search-db.service";
import { RedactorDocsService } from "../user-content/redactor-docs.service";

const url = process.env.DATABASE_URL || "";
const isolated =
  process.env.OBS_ISOLATED_TEST_DB === "1" &&
  /^postgresql:\/\/[^@]+@127\.0\.0\.1:\d+\/observatorio_billing_fixture\?/.test(
    url,
  );
(isolated ? describe : describe.skip)(
  "Redactor PostgreSQL isolated integration",
  () => {
    let prisma: PrismaClient,
      search: RedactorSearchService,
      docs: RedactorDocsService,
      global: SearchDbService;
    let owner: string, other: string, capped: string;
    let latestQuery: { text: string; values: unknown[] },
      reads = 0;
    const official =
      "Texto oficial de prueba: igualdad y libertad. ".repeat(20) +
      "FIN ÍNTEGRO DE PRUEBA";
    beforeAll(async () => {
      prisma = new PrismaClient({ datasourceUrl: url });
      await prisma.$connect();
      const user = (email: string) =>
        prisma.user.create({
          data: { email, passwordHash: "synthetic-no-login", plan: "pro" },
        });
      owner = (await user("redactor-owner@example.test")).id;
      other = (await user("redactor-other@example.test")).id;
      capped = (await user("redactor-capped@example.test")).id;
      for (const [id, title, scope, visibility] of [
        ["constitucion-nacional", "Constitución Nacional", null, "PUBLICA"],
        ["const-chaco", "Constitución de Chaco", "chaco", "PUBLICA"],
        ["const-caba", "constitución porteña", "caba", "PUBLICA"],
        ["const-oculta", "Constitución oculta", null, "ENLACE"],
        ["codigo-fixture", "Código de prueba", null, "PUBLICA"],
      ]) {
        await prisma.norms.create({
          data: {
            id,
            title,
            common_name: title,
            scope_slug: scope,
            visibility,
            short_code: id === "constitucion-nacional" ? "CN" : null,
            norm_type: id.startsWith("codigo") ? "CODIGO" : "CONSTITUCION",
            jurisdiction: scope ? "PROVINCIAL" : "NACIONAL",
            number: "0",
          },
        });
      }
      await prisma.articles.createMany({
        data: [
          ...Array.from({ length: 12 }, (_, i) => ({
            id: `fixture-cn-${i + 1}`,
            norm_id: "constitucion-nacional",
            number: String(i + 1),
            ord: i + 1,
            title: `Título ${i + 1}`,
            body: official,
          })),
          {
            id: "fixture-cn-14bis",
            norm_id: "constitucion-nacional",
            number: "14 Bis",
            ord: 14.1,
            title: "Trabajo",
            body: official,
          },
          {
            id: "fixture-chaco-7",
            norm_id: "const-chaco",
            number: "7",
            ord: 7,
            title: "Provincial",
            body: official,
          },
          {
            id: "fixture-hidden-7",
            norm_id: "const-oculta",
            number: "7",
            ord: 7,
            title: "No pública",
            body: official,
          },
          ...Array.from({ length: 3000 }, (_, i) => ({
            id: `fixture-code-${i + 1}`,
            norm_id: "codigo-fixture",
            number: String(i + 1),
            ord: i + 1,
            title: "Artículo de prueba",
            body: official,
          })),
        ],
      });
      search = new RedactorSearchService(
        {
          $transaction: (run: (tx: unknown) => Promise<unknown>, options: { maxWait: number; timeout: number }) => prisma.$transaction(tx => run({
            $executeRaw: tx.$executeRaw.bind(tx),
            $queryRaw: (query: typeof latestQuery) => {
              latestQuery = query;
              reads++;
              return tx.$queryRaw(query as never);
            },
          }), options),
        } as never,
        { getCorpusVersion: () => "fixture-v1" } as never,
      );
      global = new SearchDbService(prisma as never);
      docs = new RedactorDocsService(prisma as never);
    }, 60_000);
    afterAll(async () => {
      await prisma?.$disconnect();
    });

    test("generic constitution ranking and explicit province are deterministic", async () => {
      const page = await search.norms("constitución");
      expect(page.results.map((r) => r.id)).toEqual([
        "constitucion-nacional",
        "const-chaco",
        "const-caba",
      ]);
      expect(page.results[2].title).toBe(
        "Constitución de la Ciudad Autónoma de Buenos Aires",
      );
      expect((await search.norms("constitución chaco")).results[0].id).toBe(
        "const-chaco",
      );
    });
    test("cold-start token membership and fixed-norm metadata do not need the full registry", async () => {
      expect((await search.tokens()).tokens).toContain("cn");
      expect((await search.norm("constitucion-nacional")).url).toBe(
        "/constituciones/nacional",
      );
      await expect(search.norm("const-oculta")).rejects.toThrow("disponible");
    });
    test("7, Art. 7, prefixes and bis stay in their selected norm", async () => {
      for (const q of ["7", "Art. 7", "artículo 7"]) {
        const page = await search.articles("constitucion-nacional", q);
        expect(page.results.map((r) => r.id)).toEqual(["fixture-cn-7"]);
      }
      expect(
        (await search.articles("constitucion-nacional", "ART. 14 bis"))
          .results[0].id,
      ).toBe("fixture-cn-14bis");
      expect(
        (await search.articles("constitucion-nacional", "245")).results,
      ).toEqual([]);
      expect((await search.articles("const-chaco", "7")).results[0].id).toBe(
        "fixture-chaco-7",
      );
    });
    test("listing and full-text results use the same light contract and paginate", async () => {
      const page = await search.articles("constitucion-nacional", "");
      expect(page.results).toHaveLength(10);
      expect(page.nextOffset).toBe(10);
      expect(page.results[0].number).toBe("1");
      expect(page.results[0].preview).toHaveLength(160);
      expect(page.results[0]).not.toHaveProperty("text");
      expect(page.results[0]).not.toHaveProperty("explicacion");
      const text = await search.articles("constitucion-nacional", "igualdad");
      expect(Object.keys(text.results[0]).sort()).toEqual(
        Object.keys(page.results[0]).sort(),
      );
      expect(
        (await search.articles("constitucion-nacional", "", 10)).results,
      ).toHaveLength(3);
    });
    test("one bounded select resolves an exact article in a 3000-article norm; EXPLAIN is recorded", async () => {
      const before = reads;
      expect(
        (await search.articles("codigo-fixture", "245")).results[0].number,
      ).toBe("245");
      expect(reads - before).toBe(1);
      const plan = await prisma.$queryRawUnsafe<Array<Record<string, any>>>(
        `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${latestQuery.text}`,
        ...latestQuery.values,
      );
      const report = plan[0]["QUERY PLAN"][0];
      console.log(
        JSON.stringify({
          measurement: "isolated 3000 synthetic articles, exact scoped lookup",
          planningMs: report["Planning Time"],
          executionMs: report["Execution Time"],
          root: report.Plan["Node Type"],
        }),
      );
    });
    test("full text is fetched by exact identity; hidden and other-law articles remain unavailable", async () => {
      expect(
        (await search.article("fixture-cn-7", "constitucion-nacional")).text,
      ).toBe(official);
      await expect(
        search.article("fixture-cn-7", "const-chaco"),
      ).rejects.toThrow("disponible");
      await expect(
        search.article("fixture-hidden-7", "const-oculta"),
      ).rejects.toThrow("disponible");
      expect((await search.articles("const-oculta", "")).results).toEqual([]);
    });
    test("database timeout cancels the statement and releases the transaction", async () => {
      const bounded = search as unknown as { query(statement: import('@prisma/client').Prisma.Sql): Promise<unknown> };
      const { Prisma } = await import('@prisma/client');
      await expect(bounded.query(Prisma.sql`SELECT pg_sleep(3)`)).rejects.toThrow('demoró demasiado');
      expect((await search.articles('const-chaco', '7')).results[0].id).toBe('fixture-chaco-7');
    });
    test("bounded concurrency on cold lookups and warm cache avoids repeated SQL", async () => {
      const durations: number[] = [],
        before = reads;
      for (let start = 100; start < 132; start += 4) {
        await Promise.all(
          Array.from({ length: 4 }, async (_, i) => {
            const time = performance.now();
            await search.articles("codigo-fixture", String(start + i));
            durations.push(performance.now() - time);
          }),
        );
      }
      expect(reads - before).toBe(32);
      const warm = reads;
      await Promise.all(
        Array.from({ length: 4 }, () =>
          search.articles("codigo-fixture", "100"),
        ),
      );
      expect(reads).toBe(warm);
      durations.sort((a, b) => a - b);
      console.log(
        JSON.stringify({
          measurement:
            "isolated fixture, 32 cold lookups, concurrency 4; warm reads zero",
          p50Ms: +durations[16].toFixed(2),
          p95Ms: +durations[30].toFixed(2),
        }),
      );
    });
    test("legacy search also respects selected norm for numeric and explicit article references", async () => {
      expect(
        (
          await global.search("7", {
            type: "article",
            lawId: "constitucion-nacional",
          })
        )[0].articleId,
      ).toBe("fixture-cn-7");
      expect(
        await global.search("245", {
          type: "article",
          lawId: "constitucion-nacional",
        }),
      ).toEqual([]);
      expect(
        await global.search("art 7 constitucion nacional", {
          type: "article",
          lawId: "const-chaco",
        }),
      ).toEqual([]);
    });
    test("document summaries omit content and body reads enforce ownership", async () => {
      const doc = await docs.create(owner, {
        title: "Mi escrito",
        content: '{"type":"doc"}',
        clientId: "fixture-document",
      });
      const page = await docs.list(owner, true);
      expect(page.docs[0]).not.toHaveProperty("content");
      expect(page.used).toBe(1);
      expect((await docs.get(owner, doc.id)).content).toBe('{"type":"doc"}');
      await expect(docs.get(other, doc.id)).rejects.toThrow("encontrado");
      await expect(
        docs.update(other, doc.id, { title: "Ajeno" }),
      ).rejects.toThrow("encontrado");
      await expect(docs.remove(other, doc.id)).rejects.toThrow("encontrado");
    });
    test("idempotent imports and concurrent quota enforcement do not duplicate or exceed the plan", async () => {
      const [a, b] = await Promise.all([
        docs.create(other, {
          title: "Importado",
          content: "{}",
          clientId: "guest-one",
        }),
        docs.create(other, {
          title: "Importado",
          content: "{}",
          clientId: "guest-one",
        }),
      ]);
      expect(a.id).toBe(b.id);
      expect((await docs.list(other, true)).used).toBe(1);
      await prisma.redactorDoc.createMany({
        data: Array.from({ length: 29 }, (_, i) => ({
          userId: capped,
          title: `Escrito ${i}`,
          content: "{}",
        })),
      });
      const results = await Promise.allSettled([
        docs.create(capped, { title: "Último", content: "{}" }),
        docs.create(capped, { title: "Exceso", content: "{}" }),
      ]);
      expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
      expect((await docs.list(capped, true)).used).toBe(30);
    });
  },
);
