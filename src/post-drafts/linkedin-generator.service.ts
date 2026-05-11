import { Injectable, Logger } from '@nestjs/common';
import { Law, Article, LawSegment } from '../common/types/law.types';
import { GenerateResult, TemplateId } from './types';
import { computeFrontendPath } from '../common/utils/law-url.util';

const FRONTEND_BASE = 'https://observatorio-de-leyes-front.vercel.app';
const UTM_BASE      = 'utm_source=linkedin&utm_medium=social';

// ── hashtag registry por categoría ───────────────────────────────────────────

const CATEGORY_HASHTAGS: Record<string, string[]> = {
  laboral:        ['#RRHH', '#DerechoLaboral', '#RecursosHumanos'],
  penal:          ['#DerechoPenal', '#Abogados'],
  civil:          ['#DerechoCivil', '#Contratos'],
  aduanero:       ['#ComercioExterior', '#Aduanas'],
  genero:         ['#Género', '#DerechosHumanos'],
  salud:          ['#Salud', '#SaludMental'],
  transparencia:  ['#Transparencia', '#GobiernoAbierto'],
  consumidor:     ['#Consumidores', '#Ecommerce'],
  ninez:          ['#Infancia', '#Familia'],
  educacion:      ['#Educación'],
  ambiental:      ['#MedioAmbiente', '#Sustentabilidad'],
  constitucion:   ['#Constitución', '#DerechosConstitucionales'],
  internacional:  ['#DerechoInternacional'],
};

const ALWAYS_HASHTAGS = ['#LegislaciónArgentina', '#ObservatorioDeLeyes'];

// ── helpers ───────────────────────────────────────────────────────────────────

function buildHashtags(category: string | undefined): string {
  const specific = category ? (CATEGORY_HASHTAGS[category] ?? []) : [];
  return [...specific.slice(0, 3), ...ALWAYS_HASHTAGS].join(' ');
}

function lawName(law: Law): string {
  return law.commonName ?? law.title;
}

function utmContent(lawId: string, articleNumber: string): string {
  const safeId  = lawId.replace(/[^a-z0-9-]/g, '-').slice(0, 30);
  const safeArt = articleNumber.replace(/\s+/g, '').slice(0, 10);
  return `${safeId}_art${safeArt}`;
}

function buildUrl(law: Law, articleNumber: string, utmCtx: string): string {
  const path     = computeFrontendPath(law);
  const artPart  = articleNumber !== '0' ? `?articulo=${articleNumber.replace(/\s+/g, '-')}&` : '?';
  const campaign = `li-${law.category ?? 'contenido'}`;
  return `${FRONTEND_BASE}${path}${artPart}${UTM_BASE}&utm_campaign=${campaign}&utm_content=${utmCtx}`;
}

function buildCommentText(law: Law, articleNumber: string, utmCtx: string): string {
  return `Texto completo:\n${buildUrl(law, articleNumber, utmCtx)}`;
}

// ── templates ─────────────────────────────────────────────────────────────────

function buildLiArticulo(law: Law, article: Article, seg: LawSegment | null): string {
  const name    = lawName(law);
  const artRef  = `${name} — Art. ${article.number}`;
  const explic  = seg?.plainExplanation ?? article.plainLanguageExplanation ?? '';
  const example = seg?.practicalExample ?? '';

  const effects = (article.practicalEffects ?? []).slice(0, 3);
  const effectsBlock = effects.length > 0
    ? `\n\n¿Qué implica en la práctica?\n${effects.map(e => `· ${e}`).join('\n')}`
    : '';

  const ejemploBlock = example
    ? `\n\nEjemplo práctico:\n${example}`
    : '';

  return `${artRef}\n\n${explic}${ejemploBlock}${effectsBlock}`;
}

function buildLiEfectos(law: Law, article: Article): string {
  const name    = lawName(law);
  const artRef  = `${name} — Art. ${article.number}`;
  const explic  = article.plainLanguageExplanation
    ? `${article.plainLanguageExplanation}\n\n`
    : '';
  const effects = (article.practicalEffects ?? []).slice(0, 5).map(e => `· ${e}`).join('\n');
  return `${artRef}\n\n${explic}Efectos prácticos:\n${effects}`;
}

function buildLiBase(law: Law): string {
  const name = lawName(law);
  const body = law.executiveSummary ?? law.practicalImpact ?? law.summary ?? law.title;
  return `${name} (Ley ${law.number})\n\n${body}`;
}

// ── scoring ───────────────────────────────────────────────────────────────────

interface Candidate {
  article:  Article;
  segment:  LawSegment | null;
  template: TemplateId;
  score:    number;
}

const SKIP = /^(objeto|alcance|ámbito|definicion|definición|ambito|aplicacion|aplicación|vigencia|derogacion|derogación)/i;

function scoreArticle(article: Article): Candidate {
  const bestSeg = (article.segments ?? [])
    .filter(s => s.plainExplanation)
    .sort((a, b) => (b.practicalExample ? 1 : 0) - (a.practicalExample ? 1 : 0))[0] ?? null;

  if ((bestSeg?.practicalExample || (article.practicalEffects?.length ?? 0) > 0) && (bestSeg?.plainExplanation || article.plainLanguageExplanation)) {
    return { article, segment: bestSeg, template: 'LI_ARTICULO', score: 100 };
  }
  if ((article.practicalEffects?.length ?? 0) >= 2) {
    return { article, segment: null, template: 'LI_EFECTOS', score: 60 };
  }
  if (article.plainLanguageExplanation) {
    return { article, segment: bestSeg, template: 'LI_ARTICULO', score: 40 };
  }
  return { article, segment: null, template: 'LI_BASE', score: 0 };
}

// ── public API ────────────────────────────────────────────────────────────────

@Injectable()
export class LinkedInGeneratorService {
  private readonly logger = new Logger(LinkedInGeneratorService.name);

  generate(law: Law, usedArticles: Set<string>): GenerateResult | null {
    const hashtags = buildHashtags(law.category);

    const candidates: Candidate[] = (law.articles ?? [])
      .filter(a => !usedArticles.has(`${law.id}::${a.number}`))
      .filter(a => !SKIP.test(a.title ?? ''))
      .map(scoreArticle)
      .filter(c => c.score > 0)
      .sort((a, b) => b.score - a.score);

    if (candidates.length === 0) {
      const utmCtx = utmContent(law.id, '0');
      this.logger.debug(`[linkedin] ${law.id} → LI_BASE fallback`);
      return {
        postText:      buildLiBase(law),
        commentText:   buildCommentText(law, '0', utmCtx),
        hashtags,
        lawId:         law.id,
        lawTitle:      lawName(law),
        articleNumber: '0',
        utmContent:    utmCtx,
        templateUsed:  'LI_BASE',
      };
    }

    const best = candidates[0];
    const { article, segment, template } = best;
    const utmCtx = utmContent(law.id, article.number);

    let postText: string;
    switch (template) {
      case 'LI_ARTICULO': postText = buildLiArticulo(law, article, segment); break;
      case 'LI_EFECTOS':  postText = buildLiEfectos(law, article);           break;
      default:             postText = buildLiBase(law);
    }

    this.logger.debug(`[linkedin] ${law.id} Art.${article.number} → ${template} (score ${best.score})`);

    return {
      postText,
      commentText:   buildCommentText(law, article.number, utmCtx),
      hashtags,
      lawId:         law.id,
      lawTitle:      lawName(law),
      articleNumber: article.number,
      utmContent:    utmCtx,
      templateUsed:  template,
    };
  }
}
