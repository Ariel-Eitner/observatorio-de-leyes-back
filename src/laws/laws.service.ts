import { Injectable, NotFoundException } from '@nestjs/common';
import { ALL_LAWS, NORMAS_CLAVE } from '../data';
import { CONSTITUCIONES_PROVINCIALES } from '../data/constituciones-provinciales/index';
import { Law, LawSummary } from '../common/types/law.types';
import { QueryLawDto } from './dto/query-law.dto';
import { computeFrontendPath } from '../common/utils/law-url.util';

// Metadata estática que no puede derivarse de los data files solos
const LAW_STATIC_META: Record<string, { shortCode?: string; apiPath: string; aliases?: string[]; isDestacada?: boolean; category?: string }> = {
  'constitucion-nacional': { shortCode: 'CN',    apiPath: '/laws/constitucion-nacional',  aliases: ['CN', '24430', '24.430'],   isDestacada: false, category: 'constitucion' },
  'codigo-penal':          { shortCode: 'CP',    apiPath: '/laws/codigo-penal',           aliases: ['CP', '11179', '11.179'],   isDestacada: true,  category: 'penal'        },
  'ley-27150':             { shortCode: 'CPP',   apiPath: '/laws/ley-27150',              aliases: ['CPP', '27150', '27.150'],  isDestacada: true,  category: 'penal'        },
  'ley-20744':             { shortCode: 'LCT',   apiPath: '/laws/ley-20744',              aliases: ['LCT', '20744', '20.744'],  isDestacada: true,  category: 'laboral'      },
  'codigo-aduanero':       { shortCode: 'CA',    apiPath: '/laws/codigo-aduanero',        aliases: ['CA', '22415', '22.415'],   isDestacada: true,  category: 'aduanero'     },
  'codigo-civil-comercial': { shortCode: 'CCyCN', apiPath: '/laws/codigo-civil-comercial', aliases: ['CCyCN', '26994', '26.994'], isDestacada: true, category: 'civil'        },
  'ley-25326':             { shortCode: 'Ley 25.326', apiPath: '/laws/number/25326',    aliases: ['25326', '25.326'],         category: 'transparencia' },
  'ley-26639':             { shortCode: 'Ley 26.639', apiPath: '/laws/ley-26639',       aliases: ['26639', '26.639'],         category: 'ambiental'    },
  'ley-27499':             { shortCode: 'Ley 27.499', apiPath: '/laws/ley-27499',       aliases: ['27499', '27.499', 'Micaela'], category: 'genero'      },
  'ley-26743':             { shortCode: 'Ley 26.743', apiPath: '/laws/ley-26743',       aliases: ['26743', '26.743'],         category: 'genero'       },
  'ley-26618':             { shortCode: 'Ley 26.618', apiPath: '/laws/ley-26618',       aliases: ['26618', '26.618'],         category: 'genero'       },
  'ley-26485':             { shortCode: 'Ley 26.485', apiPath: '/laws/ley-26485',       aliases: ['26485', '26.485'],         category: 'genero'       },
  'ley-27610':             { shortCode: 'Ley 27.610', apiPath: '/laws/ley-27610',       aliases: ['27610', '27.610', 'IVE'],  category: 'genero'       },
  'ley-26657':             { shortCode: 'Ley 26.657', apiPath: '/laws/ley-26657',       aliases: ['26657', '26.657'],         category: 'salud'        },
  'ley-27642':             { shortCode: 'Ley 27.642', apiPath: '/laws/ley-27642',       aliases: ['27642', '27.642', 'etiquetado frontal', 'alimentacion saludable', 'sellos advertencia'], category: 'salud' },
  'decreto-151-2022':      { shortCode: 'Dec. 151/2022', apiPath: '/laws/decreto-151-2022', aliases: ['151/2022', 'decreto 151', 'reglamentacion etiquetado'], category: 'salud' },
  'ley-27275':             { shortCode: 'Ley 27.275', apiPath: '/laws/ley-27275',       aliases: ['27275', '27.275'],         category: 'transparencia'},
  'ley-24240':             { shortCode: 'Ley 24.240', apiPath: '/laws/ley-24240',       aliases: ['24240', '24.240'],         category: 'consumidor'   },
  'ley-26061':             { shortCode: 'Ley 26.061', apiPath: '/laws/ley-26061',       aliases: ['26061', '26.061'],         category: 'ninez'        },
  'ley-26206':             { shortCode: 'Ley 26.206', apiPath: '/laws/ley-26206',       aliases: ['26206', '26.206'],         category: 'educacion'    },
  'ley-27802':             { shortCode: 'Ley 27.802', apiPath: '/laws/number/27802',    aliases: ['27802', '27.802'] },
  'decreto-207-2011':      { shortCode: 'Decreto 207/2011', apiPath: '/laws/decreto-207-2011' },
  'carta-onu':             { shortCode: 'Carta ONU', apiPath: '/laws/carta-onu',   aliases: ['ONU', 'Carta ONU', 'Naciones Unidas'], isDestacada: true, category: 'internacional' },
  'ley-27801':             { shortCode: 'LPJ',       apiPath: '/laws/ley-27801',   aliases: ['LPJ', '27801', '27.801', 'Ley Penal Juvenil', 'Régimen Penal Juvenil'], isDestacada: true, category: 'penal' },
  'ley-27742':             { shortCode: 'LdB',       apiPath: '/laws/ley-27742',   aliases: ['RIGI', 'Ley de Bases', 'Ley Ómnibus', '27742', '27.742', 'Ley del RIGI', 'ley omnibus'], isDestacada: true, category: 'economico' },
  'const-buenos-aires':      { shortCode: 'CBsAs', apiPath: '/laws/const-buenos-aires',       category: 'constitucion' },
  'const-caba':              { shortCode: 'CCABA', apiPath: '/laws/const-caba',               category: 'constitucion' },
  'const-catamarca':         { shortCode: 'CCat',  apiPath: '/laws/const-catamarca',          category: 'constitucion' },
  'const-chaco':             { shortCode: 'CChac', apiPath: '/laws/const-chaco',              category: 'constitucion' },
  'const-chubut':            { shortCode: 'CChub', apiPath: '/laws/const-chubut',             category: 'constitucion' },
  'const-cordoba':           { shortCode: 'CCor',  apiPath: '/laws/const-cordoba',            category: 'constitucion' },
  'const-corrientes':        { shortCode: 'CCtes', apiPath: '/laws/const-corrientes',         category: 'constitucion' },
  'const-entre-rios':        { shortCode: 'CER',   apiPath: '/laws/const-entre-rios',         category: 'constitucion' },
  'const-formosa':           { shortCode: 'CFos',  apiPath: '/laws/const-formosa',            category: 'constitucion' },
  'const-jujuy':             { shortCode: 'CJuj',  apiPath: '/laws/const-jujuy',              category: 'constitucion' },
  'const-la-pampa':          { shortCode: 'CLPam', apiPath: '/laws/const-la-pampa',           category: 'constitucion' },
  'const-la-rioja':          { shortCode: 'CLRio', apiPath: '/laws/const-la-rioja',           category: 'constitucion' },
  'const-mendoza':           { shortCode: 'CMza',  apiPath: '/laws/const-mendoza',            category: 'constitucion' },
  'const-misiones':          { shortCode: 'CMis',  apiPath: '/laws/const-misiones',           category: 'constitucion' },
  'const-neuquen':           { shortCode: 'CNqn',  apiPath: '/laws/const-neuquen',            category: 'constitucion' },
  'const-rio-negro':         { shortCode: 'CRN',   apiPath: '/laws/const-rio-negro',          category: 'constitucion' },
  'const-salta':             { shortCode: 'CSal',  apiPath: '/laws/const-salta',              category: 'constitucion' },
  'const-san-juan':          { shortCode: 'CSJ',   apiPath: '/laws/const-san-juan',           category: 'constitucion' },
  'const-san-luis':          { shortCode: 'CSL',   apiPath: '/laws/const-san-luis',           category: 'constitucion' },
  'const-santa-cruz':        { shortCode: 'CSCZ',  apiPath: '/laws/const-santa-cruz',         category: 'constitucion' },
  'const-santa-fe':          { shortCode: 'CSF',   apiPath: '/laws/const-santa-fe',           category: 'constitucion' },
  'const-santiago-del-estero': { shortCode: 'CSTE', apiPath: '/laws/const-santiago-del-estero', category: 'constitucion' },
  'const-tierra-del-fuego':  { shortCode: 'CTDF',  apiPath: '/laws/const-tierra-del-fuego',  category: 'constitucion' },
  'const-tucuman':           { shortCode: 'CTUC',  apiPath: '/laws/const-tucuman',            category: 'constitucion' },
};

const SLUG_ALIASES: Record<string, string> = {
  'ley-de-glaciares': 'ley-26639',
  'ley-omnibus':      'ley-27742',
  'ley-de-bases':     'ley-27742',
  'rigi':             'ley-27742',
};


@Injectable()
export class LawsService {
  private laws: Law[] = ALL_LAWS;
  private allSources: Law[] = [...ALL_LAWS, ...NORMAS_CLAVE];

  findAll(query: QueryLawDto) {
    const { q, status, jurisdiction, normType, topic, category, yearFrom, yearTo, page = 1, limit = 20, sortBy = 'year', order = 'desc' } = query;

    let filtered = this.laws.filter((law) => {
      if (status && law.status !== status) return false;
      if (jurisdiction && law.jurisdiction !== jurisdiction) return false;
      if (normType && law.normType !== normType) return false;
      if (topic && !law.topics.includes(topic)) return false;
      if (yearFrom && law.year < yearFrom) return false;
      if (yearTo && law.year > yearTo) return false;
      if (category) {
        const lawCategory = LAW_STATIC_META[law.id]?.category ?? law.category;
        if (lawCategory !== category) return false;
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
      category: LAW_STATIC_META[law.id]?.category ?? law.category,
      _count: { articles: law.articles.length, amendments: law.amendments.length },
    }));

    return {
      data: summaries,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  findOne(id: string): Law {
    const all = [...this.allSources, ...CONSTITUCIONES_PROVINCIALES];
    const law = all.find((l) => l.id === id);
    if (!law) throw new NotFoundException(`Ley con id "${id}" no encontrada`);
    return law;
  }

  findByNumber(number: string): Law {
    const law = this.laws.find((l) => l.number === number);
    if (!law) throw new NotFoundException(`Ley N° ${number} no encontrada`);
    return law;
  }

  getRegistry() {
    const allSrcs = [...NORMAS_CLAVE, ...this.laws, ...CONSTITUCIONES_PROVINCIALES];
    const seen = new Set<string>();
    const unique = allSrcs.filter(l => { if (seen.has(l.id)) return false; seen.add(l.id); return true; });

    const laws = unique.map(law => {
      const meta: { shortCode?: string; apiPath: string; aliases?: string[]; isDestacada?: boolean; category?: string } = LAW_STATIC_META[law.id] ?? { apiPath: `/laws/${law.id}` };
      return {
        id: law.id,
        number: law.number,
        normType: law.normType,
        shortCode: meta.shortCode ?? null,
        label: law.commonName ?? law.title,
        frontendPath: computeFrontendPath(law),
        apiPath: meta.apiPath,
        available: !!meta.shortCode,
        aliases: meta.aliases ?? [],
        isDestacada: meta.isDestacada ?? false,
        category: meta.category ?? law.category ?? null,
      };
    });

    return { laws, slugAliases: SLUG_ALIASES };
  }

  getStats() {
    const src = [...this.allSources, ...CONSTITUCIONES_PROVINCIALES];
    const total = src.length;
    const totalArticles = src.reduce((sum, l) => sum + l.articles.length, 0);

    const count = (key: string, value: string) =>
      src.filter((l) => (l as unknown as Record<string, unknown>)[key] === value).length;

    return {
      total,
      totalArticles,
      byStatus: [
        { status: 'VIGENTE', _count: count('status', 'VIGENTE') },
        { status: 'DEROGADA', _count: count('status', 'DEROGADA') },
        { status: 'PARCIALMENTE_VIGENTE', _count: count('status', 'PARCIALMENTE_VIGENTE') },
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
