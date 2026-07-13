import { Injectable, NotFoundException, Logger, OnModuleInit } from '@nestjs/common';
import { NormsDbService } from '../norms-db/norms-db.service';
import { ALL_LAWS, NORMAS_CLAVE } from '../data';
import { applyCuratedRelations } from '../data/relations-curadas';
import type { NormStub } from '../data/norm-stubs';
import { Law, LawSummary } from '../common/types/law.types';
import { QueryLawDto } from './dto/query-law.dto';
import { computeFrontendPath, slugifyArticle } from '../common/utils/law-url.util';
import { buildCombined, buildLawCodesPattern, buildLawNamesIndex, parseRefChunks, pruneDanglingSelfRefs, artNumKey } from '../common/utils/inline-refs.util';
import { INFOLEG_MAP, INFOLEG_BASE_URL } from '../common/utils/infoleg-map';
import { buildVetos } from './vetos.util';

// Metadata estática que no puede derivarse de los data files solos
export const LAW_STATIC_META: Record<
	string,
	{ shortCode?: string; apiPath: string; aliases?: string[]; isDestacada?: boolean; category?: string }
> = {
	'constitucion-nacional': {
		shortCode: 'CN',
		apiPath: '/laws/constitucion-nacional',
		aliases: ['CN', '24.430'],
		isDestacada: false,
		category: 'constitucion',
	},
	'codigo-penal': {
		shortCode: 'CP',
		apiPath: '/laws/codigo-penal',
		aliases: ['CP', '11.179'],
		isDestacada: true,
		category: 'penal',
	},
	'ley-27150': {
		shortCode: 'CPP',
		apiPath: '/laws/ley-27150',
		aliases: ['CPP', '27.150'],
		isDestacada: true,
		category: 'penal',
	},
	'ley-20744': {
		shortCode: 'LCT',
		apiPath: '/laws/ley-20744',
		aliases: ['LCT', '20.744'],
		isDestacada: true,
		category: 'laboral',
	},
	'codigo-aduanero': {
		shortCode: 'CA',
		apiPath: '/laws/codigo-aduanero',
		aliases: ['CA', '22.415'],
		isDestacada: true,
		category: 'aduanero',
	},
	'codigo-civil-comercial': {
		shortCode: 'CCyCN',
		apiPath: '/laws/codigo-civil-comercial',
		aliases: ['CCyCN', '26.994'],
		isDestacada: true,
		category: 'civil',
	},
	'ley-25326': {
		shortCode: 'Ley 25.326',
		apiPath: '/laws/number/25326',
		aliases: ['25.326'],
		category: 'transparencia',
	},
	'ley-26639': { shortCode: 'Ley 26.639', apiPath: '/laws/ley-26639', aliases: ['26.639'], category: 'ambiental' },
	'ley-27499': {
		shortCode: 'Ley 27.499',
		apiPath: '/laws/ley-27499',
		aliases: ['27.499', 'Micaela'],
		category: 'genero',
	},
	'ley-26743': { shortCode: 'Ley 26.743', apiPath: '/laws/ley-26743', aliases: ['26.743'], category: 'genero' },
	'ley-26618': { shortCode: 'Ley 26.618', apiPath: '/laws/ley-26618', aliases: ['26.618'], category: 'genero' },
	'ley-26485': { shortCode: 'Ley 26.485', apiPath: '/laws/ley-26485', aliases: ['26.485'], category: 'genero' },
	'ley-27610': {
		shortCode: 'Ley 27.610',
		apiPath: '/laws/ley-27610',
		aliases: ['27.610', 'IVE'],
		category: 'genero',
	},
	'ley-26657': { shortCode: 'Ley 26.657', apiPath: '/laws/ley-26657', aliases: ['26.657'], category: 'salud' },
	'ley-27642': {
		shortCode: 'Ley 27.642',
		apiPath: '/laws/ley-27642',
		aliases: ['27.642', 'etiquetado frontal', 'alimentacion saludable', 'sellos advertencia'],
		category: 'salud',
	},
	'decreto-151-2022': {
		shortCode: 'Dec. 151/2022',
		apiPath: '/laws/decreto-151-2022',
		aliases: ['151/2022', 'decreto 151', 'reglamentacion etiquetado'],
		category: 'salud',
	},
	'ley-27275': {
		shortCode: 'Ley 27.275',
		apiPath: '/laws/ley-27275',
		aliases: ['27.275'],
		category: 'transparencia',
	},
	'ley-24240': { shortCode: 'Ley 24.240', apiPath: '/laws/ley-24240', aliases: ['24.240'], category: 'consumidor' },
	'ley-26061': { shortCode: 'Ley 26.061', apiPath: '/laws/ley-26061', aliases: ['26.061'], category: 'ninez' },
	'ley-26206': { shortCode: 'Ley 26.206', apiPath: '/laws/ley-26206', aliases: ['26.206'], category: 'educacion' },
	'ley-27802': { shortCode: 'Ley 27.802', apiPath: '/laws/number/27802', aliases: ['27.802'] },
	'decreto-315-2026': { shortCode: 'Decreto 315/2026', apiPath: '/laws/decreto-315-2026', aliases: ['315/2026'] },
	'rg-arca-5844-2026': { shortCode: 'RG ARCA 5844/2026', apiPath: '/laws/rg-arca-5844-2026', aliases: ['5844/2026', 'RG 5844'] },
	'decreto-407-2026': { shortCode: 'Decreto 407/2026', apiPath: '/laws/decreto-407-2026', aliases: ['407/2026'] },
	'dnu-70-2023': { shortCode: 'DNU 70/2023', apiPath: '/laws/dnu-70-2023', aliases: ['70/2023', 'DNU 70', 'mega DNU', 'decreto 70/2023', 'decreto 70'], isDestacada: true, category: 'economico' },
	'decreto-207-2011': { shortCode: 'Decreto 207/2011', apiPath: '/laws/decreto-207-2011' },
	'carta-onu': {
		shortCode: 'Carta ONU',
		apiPath: '/laws/carta-onu',
		aliases: ['ONU', 'Carta ONU', 'Naciones Unidas'],
		isDestacada: true,
		category: 'internacional',
	},
	'convencion-derechos-nino': {
		shortCode: 'CDN',
		apiPath: '/laws/convencion-derechos-nino',
		aliases: ['CDN', '23.849', 'Convención sobre los Derechos del Niño', 'Derechos del Niño', 'CIDN'],
		isDestacada: true,
		category: 'ninez',
	},
	'ley-26842': {
		shortCode: 'Ley 26.842',
		apiPath: '/laws/ley-26842',
		aliases: ['26.842', 'trata de personas', 'trata', 'Ley Trata', 'COFETRATA'],
		isDestacada: true,
		category: 'derechos-humanos',
	},
	'ley-27801': {
		shortCode: 'LPJ',
		apiPath: '/laws/ley-27801',
		aliases: ['LPJ', '27.801', 'Ley Penal Juvenil', 'Régimen Penal Juvenil'],
		isDestacada: true,
		category: 'penal',
	},
	'ley-23592': {
		shortCode: 'Ley 23.592',
		apiPath: '/laws/ley-23592',
		aliases: ['23.592', 'Ley Antidiscriminatoria', 'antidiscriminación'],
		category: 'derechos-humanos',
	},
	'ley-11544': {
		shortCode: 'Ley 11.544',
		apiPath: '/laws/ley-11544',
		aliases: ['11.544', 'jornada laboral', 'horas de trabajo'],
		category: 'laboral',
	},
	'ley-22278': {
		shortCode: 'Ley 22.278',
		apiPath: '/laws/ley-22278',
		aliases: ['22.278', 'régimen penal minoridad', 'menores imputados'],
		category: 'penal',
	},
	'ley-27742': {
		shortCode: 'LdB',
		apiPath: '/laws/ley-27742',
		aliases: ['RIGI', 'Ley de Bases', 'Ley Ómnibus', '27.742', 'Ley del RIGI', 'ley omnibus'],
		isDestacada: true,
		category: 'economico',
	},
	'const-buenos-aires': { shortCode: 'CBsAs', apiPath: '/laws/const-buenos-aires', category: 'constitucion' },
	'const-caba': { shortCode: 'CCABA', apiPath: '/laws/const-caba', category: 'constitucion' },
	'const-catamarca': { shortCode: 'CCat', apiPath: '/laws/const-catamarca', category: 'constitucion' },
	'const-chaco': { shortCode: 'CChac', apiPath: '/laws/const-chaco', category: 'constitucion' },
	'const-chubut': { shortCode: 'CChub', apiPath: '/laws/const-chubut', category: 'constitucion' },
	'const-cordoba': { shortCode: 'CCor', apiPath: '/laws/const-cordoba', category: 'constitucion' },
	'const-corrientes': { shortCode: 'CCtes', apiPath: '/laws/const-corrientes', category: 'constitucion' },
	'const-entre-rios': { shortCode: 'CER', apiPath: '/laws/const-entre-rios', category: 'constitucion' },
	'const-formosa': { shortCode: 'CFos', apiPath: '/laws/const-formosa', category: 'constitucion' },
	'const-jujuy': { shortCode: 'CJuj', apiPath: '/laws/const-jujuy', category: 'constitucion' },
	'const-la-pampa': { shortCode: 'CLPam', apiPath: '/laws/const-la-pampa', category: 'constitucion' },
	'const-la-rioja': { shortCode: 'CLRio', apiPath: '/laws/const-la-rioja', category: 'constitucion' },
	'const-mendoza': { shortCode: 'CMza', apiPath: '/laws/const-mendoza', category: 'constitucion' },
	'const-misiones': { shortCode: 'CMis', apiPath: '/laws/const-misiones', category: 'constitucion' },
	'const-neuquen': { shortCode: 'CNqn', apiPath: '/laws/const-neuquen', category: 'constitucion' },
	'const-rio-negro': { shortCode: 'CRN', apiPath: '/laws/const-rio-negro', category: 'constitucion' },
	'const-salta': { shortCode: 'CSal', apiPath: '/laws/const-salta', category: 'constitucion' },
	'const-san-juan': { shortCode: 'CSJ', apiPath: '/laws/const-san-juan', category: 'constitucion' },
	'const-san-luis': { shortCode: 'CSL', apiPath: '/laws/const-san-luis', category: 'constitucion' },
	'const-santa-cruz': { shortCode: 'CSCZ', apiPath: '/laws/const-santa-cruz', category: 'constitucion' },
	'const-santa-fe': { shortCode: 'CSF', apiPath: '/laws/const-santa-fe', category: 'constitucion' },
	'const-santiago-del-estero': { shortCode: 'CSTE', apiPath: '/laws/const-santiago-del-estero', category: 'constitucion' },
	'const-tierra-del-fuego': { shortCode: 'CTDF', apiPath: '/laws/const-tierra-del-fuego', category: 'constitucion' },
	'const-tucuman': { shortCode: 'CTUC', apiPath: '/laws/const-tucuman', category: 'constitucion' },
};

const SLUG_ALIASES: Record<string, string> = {
	'ley-de-glaciares': 'ley-26639',
	'ley-omnibus': 'ley-27742',
	'ley-de-bases': 'ley-27742',
	rigi: 'ley-27742',
	// Slugs viejos "de marca" (antes en TIPO_SLUG); ahora canónico = número-nombre → 308.
	'ley-de-contrato-laboral': 'ley-20744',
	// Slug viejo del 6961 (tenía el número duplicado por el título); redirige 308 al canónico.
	'6961-6961-modificacion-del-codigo-contravencional-de-caba-servici': 'ley-caba-6961',
	// Slug mal formado (número partido con guion) que quedó en alguna referencia; 308 al canónico.
	'27-423': 'ley-27423',
};

// Etiqueta legible de cada categoría temática (slug en BD → label).
// Fuente única: antes estaba duplicada y divergente en el front (home vs buscar).
const CATEGORY_LABELS: Record<string, string> = {
	constitucional: 'Constitucional',
	penal: 'Penal',
	'procesal-penal': 'Procesal penal',
	laboral: 'Laboral',
	civil: 'Civil y comercial',
	comercial: 'Comercial',
	aduanero: 'Aduanero',
	tributario: 'Tributario',
	'datos-personales': 'Datos personales',
	transparencia: 'Transparencia',
	ambiental: 'Ambiental',
	genero: 'Género',
	salud: 'Salud',
	consumidor: 'Consumidor',
	ninez: 'Niñez',
	educacion: 'Educación',
	internacional: 'Internacional',
	'derechos-humanos': 'Derechos humanos',
	economico: 'Económico',
};
// Poblado desde la tabla `categories` al arrancar (LawsService.onModuleInit).
// CATEGORY_LABELS queda solo como fallback defensivo si la BD no respondió aún.
let _categoryLabels: Record<string, string> = {};
function catLabel(slug?: string | null): string | null {
	if (!slug) return null;
	return _categoryLabels[slug] ?? CATEGORY_LABELS[slug] ?? slug;
}

// El código de contexto para parsear referencias inline se deriva de
// law.shortCode (columna en BD); ya no hay un mapa hardcodeado.

// Código corto legible para el nodo del grafo. Preferencia: meta estática (canónicos
// como "LCT"/"CN") → shortCode de la BD ("Ley 26.529") → derivado del número
// ("Ley 27.551") → nombre. NUNCA el id crudo (antes `id.slice(0,6)` daba "ley-27").
function graphShortCode(
	law: {
		id: string;
		shortCode?: string | null;
		number?: string | null;
		normType?: string | null;
		commonName?: string | null;
		title?: string | null;
	},
	metaShort?: string,
): string {
	if (metaShort) return metaShort;
	if (law.shortCode && law.shortCode.trim()) return law.shortCode;
	const num = law.number?.trim();
	if (num) {
		const fmt = /^\d+$/.test(num) ? num.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : num;
		const t = (law.normType ?? '').toUpperCase();
		if (t.includes('DNU')) return `DNU ${fmt}`;
		if (t.includes('DECRETO')) return `Decreto ${fmt}`;
		if (t.includes('RESOLUC') || t.startsWith('RG')) return `Res. ${fmt}`;
		if (t.includes('DISPOSIC')) return `Disp. ${fmt}`;
		if (t.includes('CONSTITU')) return law.commonName ?? law.title ?? law.id;
		return `Ley ${fmt}`;
	}
	return law.commonName ?? law.title ?? law.id;
}

@Injectable()
export class LawsService implements OnModuleInit {
	private readonly logger = new Logger(LawsService.name);
	private laws: Law[] = ALL_LAWS;
	// Normas servidas desde la BD (migradas). Se hidratan al arrancar.
	private dbNorms: Law[] = [];
	// Stubs (normas referenciadas, no cargadas) — fuente: tabla norm_stubs en BD.
	private stubs: NormStub[] = [];
	// Categorías temáticas — fuente: tabla categories en BD.
	private categories: { slug: string; label: string; description: string | null; icon: string | null; ord: number }[] = [];
	// Candado para que dos refrescos no corran a la vez.
	private hydrating = false;

	constructor(private readonly normsDb: NormsDbService) {}

	private get allSources(): Law[] {
		return [...ALL_LAWS, ...NORMAS_CLAVE, ...this.dbNorms];
	}

	/**
	 * Todas las normas del sistema (código + BD), deduplicadas por id.
	 * Fuente única para search, segments, articles y constituciones provinciales.
	 */
	getAllNorms(): Law[] {
		const seen = new Set<string>();
		return this.allSources.filter((l) => (seen.has(l.id) ? false : (seen.add(l.id), true)));
	}

	/**
	 * Circuito completo de las leyes VETADAS: sanción → veto → insistencia.
	 * Explica los huecos de numeración de la serie de leyes (por qué no existe la 27.792).
	 * El armado vive en `buildVetos` (función pura, testeable sin BD).
	 */
	getVetos() {
		const items = buildVetos(this.getAllNorms());
		return { total: items.length, items };
	}

	async onModuleInit() {
		const r = await this.refreshFromDb();
		if (r.ok) this.logger.log(`${r.count} normas hidratadas desde la BD`);
	}

	/**
	 * Sincroniza las normas en memoria con la BD de forma INCREMENTAL: carga solo
	 * las nuevas (delta) y descarta las que ya no están, sin re-hidratar todo. Así
	 * una norma recién cargada aparece en registry / grafo / refs sin reiniciar
	 * Render y sin duplicar el pico de memoria (relevante con el límite de 256M /
	 * 0.2 CPU). En el arranque, `dbNorms` está vacío → carga todo el corpus.
	 * Idempotente y protegido por un candado contra corridas concurrentes.
	 */
	async refreshFromDb(): Promise<{ ok: boolean; count: number; added: number; removed: number }> {
		if (this.hydrating) return { ok: false, count: this.dbNorms.length, added: 0, removed: 0 };
		this.hydrating = true;
		try {
			const stamps = await this.normsDb.listIdStamps();
			const idSet = new Set(stamps.map((s) => s.id));
			const haveStamp = new Map(this.dbNorms.map((n) => [n.id, n.updatedAt]));
			// A cargar: normas nuevas (no en memoria) o editadas (cambió updated_at).
			const toLoad = stamps.filter((s) => haveStamp.get(s.id) !== s.updatedAt).map((s) => s.id);
			const toRemove = new Set([...haveStamp.keys()].filter((id) => !idSet.has(id)));
			const isNew = (id: string) => !haveStamp.has(id);
			const added = toLoad.filter(isNew).length;

			// Cargar SOLO el delta, en lotes (sin pico de memoria: no se sostiene una
			// segunda copia de todo el corpus).
			const loaded: Law[] = [];
			const BATCH = 4;
			for (let i = 0; i < toLoad.length; i += BATCH) {
				const chunk = await Promise.all(
					toLoad.slice(i, i + BATCH).map((id) => this.normsDb.loadNorm(id)),
				);
				for (const law of chunk) if (law) loaded.push(law);
			}

			// Merge por id: quita las eliminadas, reemplaza las editadas, suma las nuevas.
			const byId = new Map(this.dbNorms.map((n) => [n.id, n]));
			for (const id of toRemove) byId.delete(id);
			for (const law of loaded) byId.set(law.id, law);
			this.dbNorms = [...byId.values()];

			this.stubs = await this.normsDb.listStubs();
			this.categories = await this.normsDb.listCategories();
			_categoryLabels = Object.fromEntries(this.categories.map((c) => [c.slug, c.label]));
			// Las relaciones curadas deben aplicarse a TODAS las normas (código + BD):
			// así las normas migradas a la BD reciben aristas nuevas (p. ej. las
			// inversas hacia el DNU 70/2023). applyCuratedRelations dedup por
			// type+target, así que es idempotente aunque ya corriera sobre el código.
			applyCuratedRelations([...ALL_LAWS, ...NORMAS_CLAVE, ...this.dbNorms]);
			return { ok: true, count: this.dbNorms.length, added, removed: toRemove.size };
		} catch (e) {
			this.logger.error(`Error hidratando normas desde la BD: ${(e as Error).message}`);
			return { ok: false, count: this.dbNorms.length, added: 0, removed: 0 };
		} finally {
			this.hydrating = false;
		}
	}

	findAll(query: QueryLawDto) {
		const {
			q,
			status,
			jurisdiction,
			normType,
			topic,
			category,
			yearFrom,
			yearTo,
			page = 1,
			limit = 20,
			sortBy = 'year',
			order = 'desc',
		} = query;

		let filtered = this.getAllNorms().filter((law) => {
			if (status && law.status !== status) return false;
			if (jurisdiction && law.jurisdiction !== jurisdiction) return false;
			if (normType && law.normType !== normType) return false;
			if (topic && !law.topics.includes(topic)) return false;
			if (yearFrom && law.year < yearFrom) return false;
			if (yearTo && law.year > yearTo) return false;
			if (category) {
				// Una norma matchea si la categoría está entre sus categorías (principal o secundaria).
				const cats = law.categories?.length
					? law.categories
					: (law.category ?? LAW_STATIC_META[law.id]?.category ? [law.category ?? LAW_STATIC_META[law.id]?.category] : []);
				if (!cats.includes(category)) return false;
			}
			if (q) {
				const lq = q.toLowerCase();
				return (
					law.number.toLowerCase().includes(lq) ||
					law.title.toLowerCase().includes(lq) ||
					(law.summary?.toLowerCase().includes(lq) ?? false) ||
					law.keywords.some((k) => k.toLowerCase().includes(lq))
				);
			}
			return true;
		});

		filtered.sort((a, b) => {
			const av = a[sortBy as keyof Law] as string | number;
			const bv = b[sortBy as keyof Law] as string | number;
			if (av < bv) return order === 'asc' ? -1 : 1;
			if (av > bv) return order === 'asc' ? 1 : -1;
			return 0;
		});

		const total = filtered.length;
		const skip = (page - 1) * limit;
		const page_data = filtered.slice(skip, skip + limit);

		const summaries: LawSummary[] = page_data.map((law) => ({
			id: law.id,
			number: law.number,
			title: law.title,
			commonName: law.commonName,
			summary: law.summary,
			year: law.year,
			sanctionDate: law.sanctionDate,
			status: law.status,
			jurisdiction: law.jurisdiction,
			normType: law.normType,
			topics: law.topics,
			keywords: law.keywords,
			articleCount: law.articleCount,
			category: law.category ?? LAW_STATIC_META[law.id]?.category,
			categoryLabel: catLabel(law.category ?? LAW_STATIC_META[law.id]?.category),
			categories: law.categories ?? [],
			frontendPath: computeFrontendPath(law),
			_count: { articles: law.articles.length, amendments: law.amendments.length },
		}));

		return {
			data: summaries,
			meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
		};
	}

	findOne(id: string): Law {
		const all = this.allSources;
		const law = all.find((l) => l.id === id);
		if (!law) throw new NotFoundException(`Ley con id "${id}" no encontrada`);
		this.ensureRefChunks(law);
		return law;
	}

	findByNumber(number: string): Law {
		// Normaliza (saca puntos/espacios) y busca en todas las normas (código + BD).
		// Antes buscaba solo en this.laws, vacío tras migrar todo a la BD.
		const canon = (s: string) => s.replace(/\./g, '').replace(/\s+/g, '').toLowerCase();
		const target = canon(number);
		const law = this.getAllNorms().find((l) => canon(l.number) === target);
		if (!law) throw new NotFoundException(`Ley N° ${number} no encontrada`);
		return law;
	}

	// Un solo artículo + datos mínimos de la ley. Evita que el front baje la norma
	// entera (cientos de artículos) solo para mostrar uno en el modal de referencia.
	private pickArticle(law: Law, articleNumber: string) {
		const slug = slugifyArticle(articleNumber);
		const article = law.articles.find(
			(a) => a.number === articleNumber || slugifyArticle(a.number) === slug,
		);
		if (!article) {
			throw new NotFoundException(`Art. ${articleNumber} no encontrado en "${law.id}"`);
		}
		return {
			article,
			law: {
				id: law.id,
				number: law.number,
				title: law.title,
				commonName: law.commonName,
				frontendPath: computeFrontendPath(law),
			},
		};
	}

	findArticle(id: string, articleNumber: string) {
		return this.pickArticle(this.findOne(id), articleNumber);
	}

	findArticleByNumber(number: string, articleNumber: string) {
		return this.pickArticle(this.findByNumber(number), articleNumber);
	}

	// ── Pre-cómputo de referencias inline (saca el mega-regex del front) ──────────
	private refsComputed = new WeakSet<Law>();
	private refCtx: { combined: RegExp; available: Set<string>; nameToCode: Record<string, string> } | null = null;

	private getRefCtx() {
		if (this.refCtx) return this.refCtx;
		const laws = this.getRegistry().laws;
		const shortCodes = laws.filter((l) => l.shortCode && l.available).map((l) => l.shortCode as string);
		const available = new Set<string>();
		for (const l of laws) {
			if (!l.available) continue;
			if (l.shortCode) available.add(l.shortCode);
			for (const a of l.aliases ?? []) available.add(a);
			if (l.number) available.add(l.number.replace(/\./g, ''));
		}
		// Los stubs (normas referenciadas, no cargadas) también cuentan como
		// "disponibles" para el parser y aportan su nombre al índice → así sus
		// referencias se detectan y el front las hace clickeables (ficha mínima).
		for (const s of this.stubs) available.add(s.number.replace(/\./g, ''));
		const namesIdx = buildLawNamesIndex([
			...laws.filter((l) => l.available).map((l) => ({ label: l.label, shortCode: l.shortCode, number: l.number })),
			...this.stubs.map((s) => ({ label: s.name, shortCode: '', number: s.number })),
		]);
		this.refCtx = {
			combined: buildCombined(buildLawCodesPattern(shortCodes), namesIdx.pattern),
			available,
			nameToCode: namesIdx.nameToCode,
		};
		return this.refCtx;
	}

	// Réplica de isLawAvailable del front (solo afecta a rangos/listas multi-artículo).
	private refAvailable(lawCode: string): boolean {
		const { available } = this.getRefCtx();
		if (available.has(lawCode)) return true;
		const m = lawCode.match(/^Ley\s+([\d.]+)$/i);
		return m ? available.has(m[1].replace(/\./g, '')) : false;
	}

	// Pre-parsea las referencias de cada segmento (lazy, una vez por norma en RAM).
	private ensureRefChunks(law: Law) {
		if (this.refsComputed.has(law)) return;
		// Nunca debe tumbar findOne: ante cualquier error, no agrega chunks y el
		// front cae a parsear en el cliente (fallback).
		try {
			const { combined, nameToCode } = this.getRefCtx();
			const ctxLawCode = law.shortCode ?? '';
			const isAvail = (lc: string) => this.refAvailable(lc);
			// Números de artículo que realmente existen en esta norma. Sirve para podar
			// refs "colgantes" a la propia norma (un "artículo 140" citado en una
			// explicación que en realidad es de otra ley, o un número que no es artículo)
			// que el parser, sin ley explícita, engancha al artículo homónimo de esta
			// norma → enlace 404. Ver pruneDanglingSelfRefs.
			const validArtKeys = new Set((law.articles ?? []).map((a) => artNumKey(a.number)));
			// El texto oficial cita OTRAS leyes: sin ctx, para que "art. N" suelto no
			// se enganche por error a la norma actual (solo refs explícitas).
			for (const art of law.articles ?? []) {
				if (art.text) {
					art.textChunks = parseRefChunks(art.text, combined, '', undefined, isAvail, nameToCode);
				}
				if (art.plainLanguageExplanation) {
					art.explanationChunks = pruneDanglingSelfRefs(parseRefChunks(art.plainLanguageExplanation, combined, ctxLawCode, art.number, isAvail, nameToCode), ctxLawCode, validArtKeys);
				}
				for (const seg of art.segments ?? []) {
					if (seg.text) {
						seg.textChunks = parseRefChunks(seg.text, combined, '', undefined, isAvail, nameToCode);
					}
					if (seg.plainExplanation) {
						seg.explanationChunks = pruneDanglingSelfRefs(parseRefChunks(seg.plainExplanation, combined, ctxLawCode, seg.articleNumber, isAvail, nameToCode), ctxLawCode, validArtKeys);
					}
					if (seg.practicalExample) {
						seg.exampleChunks = pruneDanglingSelfRefs(parseRefChunks(seg.practicalExample, combined, ctxLawCode, seg.articleNumber, isAvail, nameToCode), ctxLawCode, validArtKeys);
					}
				}
			}
		} catch (e) {
			this.logger.error(`Pre-cómputo de refChunks falló para "${law.id}": ${(e as Error).message}`);
		}
		this.refsComputed.add(law);
	}

	getRegistry() {
		const allSrcs = [...NORMAS_CLAVE, ...this.laws, ...this.dbNorms];
		const seen = new Set<string>();
		const unique = allSrcs.filter((l) => {
			if (seen.has(l.id)) return false;
			seen.add(l.id);
			return true;
		});

		const laws = unique.map((law) => {
			const meta: { shortCode?: string; apiPath: string; aliases?: string[]; isDestacada?: boolean; category?: string } =
				LAW_STATIC_META[law.id] ?? { apiPath: `/laws/${law.id}` };
			const infoleg = INFOLEG_MAP[law.id] ?? null;
			return {
				id: law.id,
				number: law.number,
				normType: law.normType,
				shortCode: law.shortCode ?? meta.shortCode ?? null,
				label: law.commonName ?? law.title,
				frontendPath: computeFrontendPath(law),
				apiPath: meta.apiPath,
				// Toda norma del registry está cargada (BD o código) → disponible.
				// (Antes dependía de tener shortCode en LAW_STATIC_META, así una norma
				// cargada sin entrada en ese mapa quedaba como "no disponible".)
				available: true,
				status: law.status,
				// Alias para resolver "Ley 27.551" / "27551" aunque no haya entrada
				// hardcodeada: se derivan del número de la propia norma.
				aliases: Array.from(new Set([
					...(law.aliases ?? meta.aliases ?? []),
					...(law.number ? [law.number, law.number.replace(/^(\d+)(\d{3})$/, '$1.$2')] : []),
				])),
				isDestacada: law.isDestacada ?? meta.isDestacada ?? false,
				category: law.category ?? meta.category ?? null,
				categoryLabel: catLabel(law.category ?? meta.category),
				categories: law.categories ?? [],
				// Campos para /corpus (índice + orden por jurisdicción/año/artículos).
				// Aditivos: el resto del front que consume el registry los ignora.
				jurisdiction: law.jurisdiction,
				year: law.year ?? null,
				articleCount: law.articleCount ?? law.articles?.length ?? 0,
				infolegId: infoleg?.infolegId ?? null,
				infolegUrl: infoleg ? `${INFOLEG_BASE_URL}${infoleg.infolegId}` : null,
				digestoAnexo: infoleg?.digestoAnexo ?? null,
				digestoCategoria: infoleg?.digestoCategoria ?? null,
			};
		});

		return {
			laws,
			slugAliases: SLUG_ALIASES,
			categories: this.categories,
			stubs: this.stubs.map((s) => ({ number: s.number, name: s.name, infolegId: s.infolegId ?? null })),
		};
	}

	/**
	 * Grafo del mapa legal: nodos (todas las normas) + links (relaciones tipadas).
	 * Se arma desde la memoria (código + BD) en una sola pasada, así el grafo
	 * incluye automáticamente cualquier norma nueva sin que el front pida cada una.
	 */
	getGraphData() {
		const norms = this.getAllNorms();
		const nodeIds = new Set(norms.map((n) => n.id));

		const nodes = norms.map((law) => {
			const meta = LAW_STATIC_META[law.id];
			return {
				id: law.id,
				label: law.commonName ?? law.title,
				shortCode: graphShortCode(law, meta?.shortCode),
				category: law.category ?? meta?.category ?? 'default',
				articleCount: law.articles.length,
				frontendPath: computeFrontendPath(law),
			};
		});

		const links: { source: string; target: string; weight: number; type: string }[] = [];
		const seen = new Set<string>();
		for (const law of norms) {
			for (const rel of law.relations ?? []) {
				const tgt = rel.targetLawId;
				if (!nodeIds.has(tgt) || tgt === law.id) continue;
				const key = `${rel.type}|||${law.id}|||${tgt}`;
				if (seen.has(key)) continue;
				seen.add(key);
				links.push({ source: law.id, target: tgt, weight: 10, type: rel.type });
			}
		}

		return { nodes, links };
	}

	getStats() {
		const src = this.allSources;
		const total = src.length;
		const totalArticles = src.reduce((sum, l) => sum + l.articles.length, 0);

		const count = (key: string, value: string) =>
			src.filter((l) => (l as unknown as Record<string, unknown>)[key] === value).length;

		// Categorías temáticas por norma — cuenta por TODAS las categorías de la norma
		// (principal + secundarias del array `categories`), consistente con el filtro
		// por categoría. Fallback a la principal si la norma no tiene array poblado.
		const catMap: Record<string, number> = {};
		for (const l of src) {
			const cats = l.categories?.length
				? l.categories
				: ([l.category ?? LAW_STATIC_META[l.id]?.category].filter(Boolean) as string[]);
			for (const c of cats) catMap[c] = (catMap[c] ?? 0) + 1;
		}
		const byCategory = Object.entries(catMap)
			.map(([category, _count]) => ({ category, label: catLabel(category), _count }))
			.sort((a, b) => b._count - a._count);
		// Áreas del derecho cubiertas (categorías distintas, sin contar las constitucionales)
		const areasCubiertas = byCategory.filter(
			(c) => c.category !== 'constitucional' && c.category !== 'constitucion',
		).length;
		// Constituciones provinciales (id const-*)
		const provincias = src.filter((l) => l.id.startsWith('const-')).length;

		return {
			total,
			totalArticles,
			byCategory,
			areasCubiertas,
			provincias,
			byStatus: [
				{ status: 'VIGENTE', _count: count('status', 'VIGENTE') },
				{ status: 'DEROGADA', _count: count('status', 'DEROGADA') },
				{ status: 'PARCIALMENTE_VIGENTE', _count: count('status', 'PARCIALMENTE_VIGENTE') },
				{ status: 'VETADA', _count: count('status', 'VETADA') },
			].filter((s) => s._count > 0),
			byJurisdiction: [
				{ jurisdiction: 'NACIONAL', _count: count('jurisdiction', 'NACIONAL') },
				{ jurisdiction: 'PROVINCIAL', _count: count('jurisdiction', 'PROVINCIAL') },
				{ jurisdiction: 'MUNICIPAL', _count: count('jurisdiction', 'MUNICIPAL') },
			].filter((j) => j._count > 0),
			byNormType: [
				{ normType: 'LEY', _count: count('normType', 'LEY') },
				{ normType: 'DECRETO', _count: count('normType', 'DECRETO') },
				{ normType: 'RESOLUCION', _count: count('normType', 'RESOLUCION') },
				{ normType: 'DISPOSICION', _count: count('normType', 'DISPOSICION') },
				{ normType: 'ORDENANZA', _count: count('normType', 'ORDENANZA') },
				{ normType: 'DECRETO_LEY', _count: count('normType', 'DECRETO_LEY') },
			].filter((n) => n._count > 0),
		};
	}
}
