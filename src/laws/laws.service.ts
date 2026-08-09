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

// Endpoint del front que invalida el caché de las fichas. Va hardcodeado a propósito: el
// dominio es estable y no justifica una variable de entorno más. El secreto es el mismo
// ADMIN_SECRET que ya comparten back y front.
const FRONT_REVALIDATE_URL = 'https://observatorio-de-leyes-front.vercel.app/api/revalidate';

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

// ── Lotes de hidratación ─────────────────────────────────────────────────────
// Cuánto se trae de una sola vez. El pico de memoria transitoria lo marcan los
// ARTÍCULOS del lote, no cuántas normas son: la mediana es 8 artículos por norma
// pero el Código Civil y Comercial tiene 2.671, así que "150 normas" puede querer
// decir 1.200 artículos o 20.000. Por eso el lote se arma con presupuesto: acota el
// pico sin importar qué normas caigan juntas ni cuánto crezca el corpus.
//
// Estos números NO son a ojo. Medido el 16-jul-2026 con 1.266 normas / 38.960
// artículos, contra Supabase, en el contenedor real (0.2 CPU, límite 256 MB):
//
//   por norma (lo viejo) → 595 s   |  ~141 MB
//   1.000 art / 60       → 226 s   |  141 MB (55%)
//   3.000 art / 150      → 140 s   |  144 MB (56%)   ← acá
//   8.000 art / 400      →  97 s   |  186 MB (73%)
//
// Se eligió 3.000/150: ganar 43 s más no vale comerse el margen de memoria, y el
// corpus CRECE (911 normas el 14-jul → 1.266 el 16-jul). Si algún día sobra RAM,
// subirlo es seguro; bajarlo solo cuesta tiempo de arranque.
export const LOTE_ARTICULOS = 3000;
export const LOTE_NORMAS_MAX = 150;

export function armarLotes(normas: { id: string; articleCount: number }[]): string[][] {
	const lotes: string[][] = [];
	let actual: string[] = [];
	let arts = 0;
	for (const n of normas) {
		// Cerrar el lote antes de pasarnos. Una norma gigante se lleva su propio lote:
		// preferimos un pico de 2.671 artículos solo, y no ese más 59 normas encima.
		if (actual.length > 0 && (arts + n.articleCount > LOTE_ARTICULOS || actual.length >= LOTE_NORMAS_MAX)) {
			lotes.push(actual);
			actual = [];
			arts = 0;
		}
		actual.push(n.id);
		arts += n.articleCount;
	}
	if (actual.length > 0) lotes.push(actual);
	return lotes;
}

// ── Orden del listado ─────────────────────────────────────────────────────────

export const SORT_KEYS = ['number', 'year', 'title', 'articleCount'] as const;
export type SortKey = (typeof SORT_KEYS)[number];

/**
 * Clave de orden para el número de una norma.
 *
 * `number` es TEXTO en la base y tiene tres formas: entero pelado ("27818"),
 * número con año ("990/2020", decretos y resoluciones) y algunas sin número que
 * comparar ("Carta ONU", "7-DNPDP"). Compararlo como string —que es lo que hacía
 * este listado— ordena por dígito: la Ley 48 caía entre la 6961 y la 3959.
 *
 * Devuelve [grupo, primario, secundario]. El grupo separa "tiene número" de "no
 * tiene": las que no lo tienen van al final en los dos sentidos, porque poner
 * "Carta ONU" primero al pedir "de menor a mayor" no le sirve a nadie.
 */
export function claveNumero(raw: string): [number, number, number] {
	const n = (raw ?? '').trim();
	// Con año: manda el año. El Decreto 70/2023 es posterior al 990/2020 aunque
	// su número sea más chico.
	const conAnio = n.match(/^(\d+)\s*\/\s*(\d{4})$/);
	if (conAnio) return [0, parseInt(conAnio[2], 10), parseInt(conAnio[1], 10)];
	if (/^\d+$/.test(n)) return [0, parseInt(n, 10), 0];
	return [1, 0, 0];
}

/**
 * Comparador del listado. Siempre desempata por id para que el orden sea
 * estable: sin eso, dos normas del mismo año pueden intercambiarse entre página
 * y página y aparecer repetidas o faltar.
 *
 * Ojo con `number` en listados SIN filtrar por tipo: mezcla números de ley
 * (27.818) con años de decreto (2023), que no son comparables entre sí. Dentro
 * de un mismo tipo —que es como se usa— el orden es exacto.
 */
function compararNormas(a: Law, b: Law, sortBy: SortKey, dir: 1 | -1): number {
	let cmp = 0;
	if (sortBy === 'number') {
		const [ga, pa, sa] = claveNumero(a.number);
		const [gb, pb, sb] = claveNumero(b.number);
		if (ga !== gb) return ga - gb;
		cmp = (pa - pb) || (sa - sb);
	} else if (sortBy === 'title') {
		cmp = a.title.localeCompare(b.title, 'es');
	} else if (sortBy === 'articleCount') {
		cmp = a.articleCount - b.articleCount;
	} else {
		// year: con el número como desempate, así un año con 200 normas no sale
		// en orden arbitrario.
		cmp = (a.year - b.year) || (claveNumero(a.number)[1] - claveNumero(b.number)[1]);
	}
	return cmp !== 0 ? cmp * dir : a.id.localeCompare(b.id);
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

	// ── Caché de normas completas ───────────────────────────────────────────────
	// `dbNorms` tiene las 3.100 normas SIN cuerpo. El cuerpo (artículos, segmentos,
	// metadata) se pide a la BD cuando alguien abre esa norma, y se guarda acá.
	//
	// El tope es por ARTÍCULOS, no por cantidad de normas: la mediana son 8 pero el
	// Código Civil y Comercial tiene 2.671, así que "20 normas" puede significar
	// 160 artículos o 40.000. Mismo criterio que armarLotes.
	//
	// Map conserva el orden de inserción, así que el primero que devuelve keys() es
	// el más viejo: alcanza para un LRU sin estructura extra.
	//
	// EL TOPE NO ES LIBRE: es lo que decide cuánto se relee de Supabase. Con 8.000
	// (16% de los ~49.500 artículos del corpus) el caché hacía thrashing puro:
	// medido en producción el 9-ago-2026, pedir 4 normas grandes en rueda daba hit
	// rate 0% —la segunda vuelta releía exactamente las mismas filas— porque el
	// CCyC solo (2.671 arts) se come un tercio del presupuesto. Eso puso el egreso
	// de Supabase en 1,2 GB/día contra un plan de 5 GB/mes.
	//
	// 25.000 = ~50% del corpus, con el que las normas grandes conviven sin echarse.
	// No subirlo a 49.500 (corpus entero): el corpus perezoso existe justamente
	// para no volver a los 7 min de arranque y al 69% de RAM.
	private static readonly CACHE_ARTICULOS_MAX = 25_000;
	private fullCache = new Map<string, Law>();
	private fullCacheArticulos = 0;
	// Números de artículo de todo el corpus (para el sitemap). Se invalida junto con
	// el resto del índice en refreshFromDb.
	private articleNumbersCache: { id: string; numbers: string[] }[] | null = null;
	// ¿Ya terminó la primera hidratación? Mientras sea false el corpus está a medio
	// llenar y CorpusReadyGuard corta con 503 (ver onModuleInit).
	private ready = false;

	constructor(private readonly normsDb: NormsDbService) {}

	/** El corpus está completo en memoria y se puede responder. */
	isReady(): boolean {
		return this.ready;
	}

	private get allSources(): Law[] {
		return [...ALL_LAWS, ...NORMAS_CLAVE, ...this.dbNorms];
	}

	/**
	 * Todas las normas del sistema (código + BD), deduplicadas por id.
	 *
	 * Por defecto DEJA AFUERA las no listadas (visibility='ENLACE'). Es el punto
	 * único donde se aplica esa regla a propósito: de acá salen el listado, el
	 * registry, el grafo, las stats y los vetos, así que filtrar una sola vez
	 * evita que una pantalla nueva se olvide y publique lo que no debía.
	 *
	 * `incluirNoListadas` es para el acceso DIRECTO —por id o por número—, que
	 * es justamente lo que tiene que seguir funcionando: no listada no es
	 * privada, es que no aparece sola.
	 */
	getAllNorms(opts: { incluirNoListadas?: boolean } = {}): Law[] {
		const seen = new Set<string>();
		return this.allSources.filter((l) => {
			if (seen.has(l.id)) return false;
			if (!opts.incluirNoListadas && l.visibility === 'ENLACE') return false;
			seen.add(l.id);
			return true;
		});
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

	/**
	 * Hidrata el corpus SIN bloquear el arranque.
	 *
	 * Antes esto era `await refreshFromDb()`, así que Nest no abría el puerto hasta
	 * terminar de cargar TODAS las normas. Con 911 normas eran ~97 s; con 1.261 pasó
	 * de 439 s, y Docker marcaba el contenedor `unhealthy` antes de que abriera →
	 * el frontend (depends_on: service_healthy) ni arrancaba. El arranque crecía con
	 * cada norma nueva, así que subir el `start_period` solo pateaba el problema.
	 *
	 * Ahora el puerto abre de una y el corpus entra por detrás. Mientras tanto
	 * CorpusReadyGuard responde 503 + Retry-After en las rutas que lo necesitan:
	 * es la diferencia entre "volvé en un rato" y servir 404 sobre un corpus vacío
	 * (que además envenenaría el SEO y las métricas de law_not_found).
	 */
	onModuleInit(): void {
		void this.hydrateWithRetry();
	}

	private async hydrateWithRetry(intento = 1): Promise<void> {
		const t0 = Date.now();
		const r = await this.refreshFromDb();
		if (r.ok) {
			this.logger.log(`${r.count} normas hidratadas desde la BD en ${Math.round((Date.now() - t0) / 1000)} s`);
			return;
		}
		// Sin corpus el backend no sirve para nada y el guard deja todo en 503: hay que
		// insistir, no quedarse esperando un reinicio manual.
		const espera = Math.min(15_000 * intento, 60_000);
		this.logger.error(`Hidratación fallida (intento ${intento}) — reintento en ${espera / 1000} s`);
		setTimeout(() => void this.hydrateWithRetry(intento + 1), espera);
	}

	/**
	 * Sincroniza el índice de normas con la BD.
	 *
	 * Carga las 3.100 normas SIN cuerpo, en UNA consulta. El cuerpo sale de la BD
	 * cuando alguien abre una norma (ver `getFullNorm`), así que acá no hay lotes
	 * ni presupuesto de artículos que administrar: el índice entero son ~19 MB.
	 *
	 * Sigue comparando `updated_at` contra lo que ya está en memoria, pero ya no
	 * para decidir QUÉ traer —viene todo— sino para saber qué cambió y avisarle al
	 * front qué rutas invalidar. Idempotente y con candado contra corridas
	 * concurrentes.
	 */
	async refreshFromDb(): Promise<{ ok: boolean; count: number; added: number; removed: number }> {
		if (this.hydrating) return { ok: false, count: this.dbNorms.length, added: 0, removed: 0 };
		this.hydrating = true;
		try {
			const haveStamp = new Map(this.dbNorms.map((n) => [n.id, n.updatedAt]));

			const metas = await this.normsDb.loadNormsMeta();

			const idSet = new Set(metas.map((m) => m.id));
			// Cambiadas: nuevas (no estaban) o editadas (cambió updated_at).
			const changed = metas.filter((m) => haveStamp.get(m.id) !== m.updatedAt);
			const toRemove = new Set([...haveStamp.keys()].filter((id) => !idSet.has(id)));
			const added = changed.filter((m) => !haveStamp.has(m.id)).length;

			this.dbNorms = metas;

			// El cuerpo cacheado de una norma editada quedó viejo, y el índice de
			// nombres/siglas con el que se enlazan las referencias también: una norma
			// nueva no era enlazable hasta reiniciar. Los dos se tiran acá.
			this.refCtx = null;
			// Mismo motivo para los números de artículo: una norma nueva o editada
			// cambia el sitemap.
			this.articleNumbersCache = null;
			for (const id of [...changed.map((m) => m.id), ...toRemove]) this.descachear(id);

			this.stubs = await this.normsDb.listStubs();
			this.categories = await this.normsDb.listCategories();
			_categoryLabels = Object.fromEntries(this.categories.map((c) => [c.slug, c.label]));
			// Las relaciones curadas deben aplicarse a TODAS las normas (código + BD):
			// así las normas migradas a la BD reciben aristas nuevas (p. ej. las
			// inversas hacia el DNU 70/2023). applyCuratedRelations dedup por
			// type+target, así que es idempotente aunque ya corriera sobre el código.
			applyCuratedRelations([...ALL_LAWS, ...NORMAS_CLAVE, ...this.dbNorms]);
			// Recién acá el corpus está completo: hasta este punto el guard corta con 503.
			const eraArranque = !this.ready;
			this.ready = true;

			// Avisarle al front qué rutas invalidar. En el arranque NO se notifica: ahí
			// "cambió todo" y no hubo cambio real que propagar.
			if (!eraArranque && (changed.length > 0 || toRemove.size > 0)) {
				void this.notificarFront(changed, [...toRemove]);
			}

			return { ok: true, count: this.dbNorms.length, added, removed: toRemove.size };
		} catch (e) {
			this.logger.error(`Error hidratando normas desde la BD: ${(e as Error).message}`);
			return { ok: false, count: this.dbNorms.length, added: 0, removed: 0 };
		} finally {
			this.hydrating = false;
		}
	}

	/**
	 * Le avisa al front qué rutas quedaron desactualizadas después de un refresh.
	 *
	 * Las fichas de normas se cachean para siempre (`revalidate = false`) porque así el sitio
	 * no gasta funciones: en junio de 2026 Vercel pausó el proyecto por consumo. El costo de
	 * esa decisión era que una norma nueva o editada solo se veía con un redeploy, y peor: si
	 * alguien pedía la URL antes de que existiera, **el 404 también quedaba cacheado para
	 * siempre**. Esto lo resuelve sin resignar el caché: se invalidan solo las rutas afectadas
	 * y Next las regenera recién en la próxima visita.
	 *
	 * Es fire-and-forget con timeout: si el front no responde, el refresh no se cae.
	 */
	private async notificarFront(cambiadas: Law[], eliminadas: string[]): Promise<void> {
		// Solo en producción: en local no tiene sentido (y no queremos que un refresh de
		// desarrollo vaya a invalidar el caché del sitio real).
		if (process.env.NODE_ENV !== 'production') return;
		const secret = process.env.ADMIN_SECRET;
		if (!secret) return;

		const LIMITE = 400;
		const paths: string[] = [];
		// Los números de artículo salen de la BD: en memoria las normas están sin
		// cuerpo. Una sola consulta para todas las cambiadas, y solo la columna
		// `number` — invalidar rutas no necesita el texto.
		const numeros = new Map<string, string[]>();
		try {
			for (const { normId, number } of await this.normsDb.listArticleNumbers(cambiadas.map((l) => l.id))) {
				const acc = numeros.get(normId);
				if (acc) acc.push(number);
				else numeros.set(normId, [number]);
			}
		} catch (e) {
			// Sin números se invalidan igual las fichas; los artículos quedan viejos
			// hasta el próximo refresh. Peor sería no invalidar nada.
			this.logger.warn(`No se pudieron listar los artículos a revalidar: ${(e as Error).message}`);
		}
		for (const law of cambiadas) {
			const base = computeFrontendPath(law);
			paths.push(base);
			for (const number of numeros.get(law.id) ?? []) {
				paths.push(`${base}/articulo/${slugifyArticle(number)}`);
			}
		}
		// Una norma borrada ya no tiene articulado que recorrer: alcanza con su ficha.
		for (const id of eliminadas) paths.push(`/leyes/${id}`);

		// Si el cambio es masivo, enumerar rutas es peor que invalidar todo de una: `all`
		// solo marca el caché como vencido, la regeneración sigue siendo perezosa.
		const body = paths.length > LIMITE ? { all: true } : { paths };

		const ctrl = new AbortController();
		const timer = setTimeout(() => ctrl.abort(), 10_000);
		try {
			const res = await fetch(FRONT_REVALIDATE_URL, {
				method: 'POST',
				headers: { 'content-type': 'application/json', 'x-obs-admin': secret },
				body: JSON.stringify(body),
				signal: ctrl.signal,
			});
			if (!res.ok) {
				this.logger.warn(`Revalidación del front respondió ${res.status}`);
			} else {
				this.logger.log(
					`Front revalidado: ${'all' in body ? 'todo el árbol' : `${paths.length} rutas`}`,
				);
			}
		} catch (e) {
			this.logger.warn(`No se pudo avisar al front para revalidar: ${(e as Error).message}`);
		} finally {
			clearTimeout(timer);
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
			destacada,
			scope,
			incluirNoListadas,
			page = 1,
			limit = 20,
			sortBy = 'year',
			order = 'desc',
		} = query;

		// Las no listadas solo se pueden pedir ACOTADAS A UN ÁMBITO. Sin esa
		// condición el flag sería un "mostrame todo lo oculto" y alcanzaría con
		// adivinar el parámetro para saltear la visibilidad de cualquier tanda.
		const verOcultas = !!(incluirNoListadas && scope);

		let filtered = this.getAllNorms({ incluirNoListadas: verOcultas }).filter((law) => {
			if (scope && law.scopeSlug !== scope) return false;
			if (status && law.status !== status) return false;
			if (jurisdiction && law.jurisdiction !== jurisdiction) return false;
			if (normType && law.normType !== normType) return false;
			if (topic && !law.topics.includes(topic)) return false;
			if (yearFrom && law.year < yearFrom) return false;
			if (yearTo && law.year > yearTo) return false;
			if (destacada && !law.isDestacada) return false;
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

		// Whitelist: `sortBy` venía del query string sin validar y se usaba como
		// índice de Law, así que `sortBy=articles` comparaba arrays y `sortBy=metadata`
		// objetos — devolvía cualquier orden sin fallar.
		const clave: SortKey = (SORT_KEYS as readonly string[]).includes(sortBy) ? (sortBy as SortKey) : 'year';
		const dir: 1 | -1 = order === 'asc' ? 1 : -1;
		filtered.sort((a, b) => compararNormas(a, b, clave, dir));

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
			digestoAnexo: INFOLEG_MAP[law.id]?.digestoAnexo ?? null,
			// articleCount y no articles.length: el índice no tiene el cuerpo cargado.
			_count: { articles: law.articleCount, amendments: law.amendments.length },
		}));

		return {
			data: summaries,
			meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
		};
	}

	// ── Cuerpo de una norma: BD + caché ─────────────────────────────────────────

	/** Saca una norma del caché y devuelve su presupuesto de artículos. */
	private descachear(id: string): void {
		const cached = this.fullCache.get(id);
		if (!cached) return;
		this.fullCache.delete(id);
		this.fullCacheArticulos -= cached.articles.length;
	}

	/**
	 * La norma COMPLETA: del caché si está, de la BD si no.
	 *
	 * Las referencias inline se pre-parsean una sola vez, acá, antes de guardarla:
	 * así el costo se paga en la primera visita y no en cada una.
	 */
	async getFullNorm(id: string): Promise<Law | null> {
		const cached = this.fullCache.get(id);
		if (cached) {
			// Renovar la posición en el LRU: borrar y volver a insertar la manda al final.
			this.fullCache.delete(id);
			this.fullCache.set(id, cached);
			return cached;
		}

		// Las normas que siguen viviendo en código (hoy ninguna) ya vienen completas.
		const enCodigo = [...ALL_LAWS, ...NORMAS_CLAVE].find((l) => l.id === id);
		if (enCodigo) {
			this.ensureRefChunks(enCodigo);
			return enCodigo;
		}

		// Solo si está en el índice: así una norma inexistente no dispara una consulta.
		const meta = this.dbNorms.find((n) => n.id === id);
		if (!meta) return null;

		const law = await this.normsDb.loadNorm(id);
		if (!law) return null;
		// Las relaciones salen del ÍNDICE, no de la consulta: al índice ya se le
		// aplicaron las relaciones curadas (las que no están en la BD, como las
		// inversas hacia el DNU 70/2023). Si se usaran las de `loadNorm`, la ficha
		// de la norma mostraría menos aristas que el mapa legal, sin ningún síntoma.
		law.relations = meta.relations;
		const infoleg = INFOLEG_MAP[law.id];
		law.infolegUrl = infoleg ? `${INFOLEG_BASE_URL}${infoleg.infolegId}` : null;
		law.digestoAnexo = infoleg?.digestoAnexo ?? null;
		this.ensureRefChunks(law);

		// Desalojar de a uno desde el más viejo hasta que entre. Una norma que sola
		// se pasa del tope igual se sirve: se guarda y el próximo ingreso la echa.
		this.fullCache.set(law.id, law);
		this.fullCacheArticulos += law.articles.length;
		while (this.fullCacheArticulos > LawsService.CACHE_ARTICULOS_MAX && this.fullCache.size > 1) {
			const masViejo = this.fullCache.keys().next().value as string;
			this.descachear(masViejo);
		}
		return law;
	}

	/**
	 * La norma con el articulado ADELGAZADO: de cada artículo queda lo que necesita
	 * la navegación (id, número, título, orden) y nada de texto.
	 *
	 * Es para la página de UN artículo, que hasta ahora bajaba la norma entera para
	 * mostrar uno solo: 4,2 MB del Código Civil y Comercial para servir ~2 kB, y
	 * multiplicado por los 2.671 artículos que tiene. La página resuelve el artículo
	 * contra esta lista —con el mismo criterio de siempre, así no se reabre el bug
	 * de los dos slugs desincronizados— y después pide ESE artículo completo.
	 *
	 * OJO: los artículos vienen con `text` vacío A PROPÓSITO. No usar este endpoint
	 * para nada que muestre articulado (visor, descarga de la ley, buscador).
	 */
	async getNormLight(id: string): Promise<Law | null> {
		const full = await this.getFullNorm(id);
		if (!full) return null;
		return {
			...full,
			articles: full.articles.map((a) => ({
				...a,
				text: '',
				plainLanguageExplanation: null,
				practicalEffects: [],
				examples: [],
				relatedArticles: [],
				jurisprudence: [],
				jurisprudenceRefs: undefined,
				regulations: [],
				keywords: [],
				segments: [],
				amendments: [],
				visualContent: undefined,
				textChunks: undefined,
				explanationChunks: undefined,
			})),
		};
	}

	/**
	 * Números de artículo de TODAS las normas, sin una sola línea de texto legal.
	 *
	 * Existe por el sitemap de artículos, que necesita una URL por artículo y para
	 * eso pedía las ~3.100 normas COMPLETAS —en paralelo— solo para leer
	 * `article.number`. Con el corpus perezoso eso dejó de salir de la RAM y pasó a
	 * ser una pasada entera por Supabase: 105 MB por regeneración, y encima el
	 * paralelismo garantizaba que el caché se vaciara solo. Acá son ~600 kB de una
	 * consulta, y quedan cacheados hasta el próximo refresh.
	 */
	async getArticleNumbers(): Promise<{ id: string; numbers: string[] }[]> {
		if (this.articleNumbersCache) return this.articleNumbersCache;

		const normas = this.getAllNorms();
		const enBd = new Set(this.dbNorms.map((n) => n.id));
		const porNorma = new Map<string, string[]>();

		// Las normas que siguen viviendo en código (hoy ninguna) ya tienen el
		// articulado en memoria: pedírselo a la BD devolvería vacío.
		for (const l of normas) {
			if (!enBd.has(l.id)) {
				porNorma.set(l.id, l.articles.map((a) => a.number).filter((n) => n?.trim()));
			}
		}

		const ids = normas.filter((l) => enBd.has(l.id)).map((l) => l.id);
		for (const { normId, number } of await this.normsDb.listArticleNumbers(ids)) {
			if (!number?.trim()) continue;
			const ya = porNorma.get(normId);
			if (ya) ya.push(number);
			else porNorma.set(normId, [number]);
		}

		this.articleNumbersCache = [...porNorma].map(([id, numbers]) => ({ id, numbers }));
		return this.articleNumbersCache;
	}

	/**
	 * Resuelve una norma por su ruta pública exacta, INCLUYENDO las no listadas.
	 *
	 * Existe por ellas: el registry —que es como el front resuelve todo lo demás—
	 * deja afuera las `ENLACE`, así que sin esto una norma no listada sería
	 * inalcanzable y "accesible por link directo" no significaría nada.
	 *
	 * Toma la ruta completa y no (ámbito, tipo, número) para que la regla de
	 * armado viva en un solo lado: computeFrontendPath.
	 */
	async findByFrontendPath(path: string): Promise<Law | null> {
		const buscada = (path || '').split('?')[0].replace(/\/+$/, '');
		if (!buscada.startsWith('/')) return null;
		const meta = this.getAllNorms({ incluirNoListadas: true })
			.find((l) => computeFrontendPath(l) === buscada);
		return meta ? this.getFullNorm(meta.id) : null;
	}

	async findOne(id: string): Promise<Law> {
		const law = await this.getFullNorm(id);
		if (!law) throw new NotFoundException(`Ley con id "${id}" no encontrada`);
		return law;
	}

	async findByNumber(number: string): Promise<Law> {
		// Normaliza (saca puntos/espacios) y busca en todas las normas (código + BD).
		// Antes buscaba solo en this.laws, vacío tras migrar todo a la BD.
		const canon = (s: string) => s.replace(/\./g, '').replace(/\s+/g, '').toLowerCase();
		const target = canon(number);
		// incluirNoListadas: buscar por número es acceso directo, igual que por id.
		const meta = this.getAllNorms({ incluirNoListadas: true }).find((l) => canon(l.number) === target);
		if (!meta) throw new NotFoundException(`Ley N° ${number} no encontrada`);
		return this.findOne(meta.id);
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

	async findArticle(id: string, articleNumber: string) {
		return this.pickArticle(await this.findOne(id), articleNumber);
	}

	async findArticleByNumber(number: string, articleNumber: string) {
		return this.pickArticle(await this.findByNumber(number), articleNumber);
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

	/**
	 * Normas únicas (código + BD) sin duplicados por id. Base de los dos registries.
	 * Sin las no listadas: el registry alimenta el sitemap y el enlazado inline.
	 */
	private registrySources(): Law[] {
		const allSrcs = [...NORMAS_CLAVE, ...this.laws, ...this.dbNorms];
		const seen = new Set<string>();
		return allSrcs.filter((l) => {
			if (seen.has(l.id)) return false;
			if (l.visibility === 'ENLACE') return false;
			seen.add(l.id);
			return true;
		});
	}

	/**
	 * Los campos con los que se RESUELVE una referencia: quién es, cómo se la
	 * nombra y a dónde apunta. Es la parte que comparten `/laws/registry` y
	 * `/laws/registry/light`, y vive en un solo lugar a propósito: si las dos
	 * versiones derivaran los alias distinto, una norma resolvería en una y no en
	 * la otra, y el enlazado inline fallaría sin ruido.
	 */
	private registryCore(law: Law) {
		const meta: { shortCode?: string; apiPath: string; aliases?: string[]; isDestacada?: boolean; category?: string } =
			LAW_STATIC_META[law.id] ?? { apiPath: `/laws/${law.id}` };
		return {
			id: law.id,
			number: law.number,
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
		};
	}

	private registryTail() {
		return {
			slugAliases: SLUG_ALIASES,
			categories: this.categories,
			stubs: this.stubs.map((s) => ({ number: s.number, name: s.name, infolegId: s.infolegId ?? null })),
		};
	}

	/**
	 * Registry completo: resolución + catálogo (jurisdicción, año, cantidad de
	 * artículos, InfoLeg, digesto). Lo piden desde el servidor las pocas páginas
	 * que muestran esos datos — /corpus, los sitemaps, el redactor, las páginas de
	 * índice por tipo. Pesa ~1,6 MB, así que NO tiene que viajar al navegador:
	 * para eso está `getRegistryLight()`.
	 */
	getRegistry() {
		const laws = this.registrySources().map((law) => {
			const infoleg = INFOLEG_MAP[law.id] ?? null;
			return {
				...this.registryCore(law),
				normType: law.normType,
				categoryLabel: catLabel(law.category ?? LAW_STATIC_META[law.id]?.category),
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

		return { laws, ...this.registryTail() };
	}

	/**
	 * Solo lo necesario para resolver una referencia a una norma.
	 *
	 * Existe por dónde se consume: el layout raíz del frontend lo pide en CADA
	 * request y se lo pasa a un componente cliente, así que lo que devuelva acá
	 * termina serializado dentro del HTML de todas las páginas del sitio. Con el
	 * registry completo eso eran 1,91 MB de HTML en la home.
	 *
	 * Devuelve los mismos campos que el front ya usaba del lado del cliente: el
	 * catálogo (jurisdicción, año, InfoLeg, digesto) no lo lee ningún componente
	 * de navegador, solo Server Components que piden `/laws/registry` directo.
	 */
	getRegistryLight() {
		return {
			laws: this.registrySources().map((law) => this.registryCore(law)),
			...this.registryTail(),
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
				articleCount: law.articleCount,
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
		// getAllNorms y no allSources: las estadísticas son públicas y no deben
		// contar lo no listado (si no, "3.408 normas" no coincide con lo navegable).
		const src = this.getAllNorms();
		const total = src.length;
		const totalArticles = src.reduce((sum, l) => sum + l.articleCount, 0);

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
