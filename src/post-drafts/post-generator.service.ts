import { Injectable, Logger } from '@nestjs/common';
import { Law, Article, LawSegment } from '../common/types/law.types';
import { GenerateResult, TemplateId } from './types';
import { computeFrontendPath } from '../common/utils/law-url.util';

const FRONTEND_BASE = 'https://observatorio-de-leyes-front.vercel.app';

const UTM_BASE = 'utm_source=twitter&utm_medium=social&utm_campaign=contenido';

// Twitter limit — URLs count as 23 chars (t.co), leave buffer
const TWEET_LIMIT = 270;

// ── text helpers ──────────────────────────────────────────────────────────────

function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const cut = text.slice(0, maxChars);
  const lastDot   = cut.lastIndexOf('. ');
  const lastComma = cut.lastIndexOf(', ');
  const boundary  = Math.max(lastDot, lastComma);
  if (boundary > maxChars * 0.6) {
    return cut.slice(0, boundary + 1).trim() + '…';
  }
  const lastSpace = cut.lastIndexOf(' ');
  return cut.slice(0, lastSpace > 0 ? lastSpace : maxChars).trim() + '…';
}

function lawName(law: Law): string {
  return law.commonName ?? law.title;
}

function utmContent(lawId: string, articleNumber: string): string {
  const safeId  = lawId.replace(/[^a-z0-9-]/g, '-').slice(0, 30);
  const safeArt = articleNumber.replace(/\s+/g, '').slice(0, 10);
  return `${safeId}_art${safeArt}`;
}

function buildCommentText(law: Law, articleNumber: string, utmCtx: string): string {
  const path = computeFrontendPath(law);
  const artParam = articleNumber
    .normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[º°]/g, 'o').replace(/ª/g, 'a')
    .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
  const url = `${FRONTEND_BASE}${path}?articulo=${artParam}&${UTM_BASE}&utm_content=${utmCtx}`;
  return `Ley ${law.number} · Art. ${articleNumber} — texto completo:\n${url}`;
}

// ── template builders ─────────────────────────────────────────────────────────

function buildEjemplo(law: Law, article: Article, seg: LawSegment): string {
  const name        = lawName(law);
  const header      = `${name} — Art. ${article.number}`;
  const fullExplic  = seg.plainExplanation!;
  const fullEjemplo = seg.practicalExample!;

  // overhead: header + \n\n + \n\nEjemplo: + \n\n👇 = header + 17 chars fixed
  const overhead  = header.length + 17;
  const available = TWEET_LIMIT - overhead;

  // Intentar sin truncar primero
  if (fullExplic.length + fullEjemplo.length <= available) {
    return `${header}\n\n${fullExplic}\n\nEjemplo: ${fullEjemplo}\n\n👇`;
  }

  // Truncar proporcionalmente: 55% para explicación, 45% para ejemplo
  const explicBudget  = Math.floor(available * 0.55);
  const ejemploBudget = available - explicBudget;
  const explic  = truncate(fullExplic,  explicBudget);
  const ejemplo = truncate(fullEjemplo, ejemploBudget);
  return `${header}\n\n${explic}\n\nEjemplo: ${ejemplo}\n\n👇`;
}

function buildResumen(law: Law, article: Article): string {
  const name     = lawName(law);
  const header   = `Art. ${article.number} de la ${name}`;
  const fullText = article.plainLanguageExplanation!;
  const overhead = header.length + 20; // ":\n\n" + "\n\n👇 artículo completo"
  const available = TWEET_LIMIT - overhead;
  const text = fullText.length <= available ? fullText : truncate(fullText, available);
  return `${header}:\n\n${text}\n\n👇 artículo completo`;
}

function buildEfectos(law: Law, article: Article): string {
  const name    = lawName(law);
  const header  = `${name} — Art. ${article.number}`;
  const available = TWEET_LIMIT - header.length - 20;
  // Intentar incluir todos los efectos; recortar el último si no entra
  const effects: string[] = [];
  let used = 0;
  for (const e of article.practicalEffects.slice(0, 4)) {
    const line = `· ${e}`;
    if (used + line.length + 1 > available) {
      if (effects.length === 0) effects.push(`· ${truncate(e, available - 2)}`);
      break;
    }
    effects.push(line);
    used += line.length + 1;
  }
  return `${header}:\n\n${effects.join('\n')}\n\n👇 texto completo`;
}

function buildBase(law: Law): string {
  const name   = lawName(law);
  const budget = TWEET_LIMIT - name.length - 30;
  const desc   = truncate(
    law.executiveSummary ?? law.summary ?? law.title,
    budget,
  );
  return `${name} (Ley ${law.number}):\n\n${desc}\n\n👇 ley completa`;
}

// ── scoring ───────────────────────────────────────────────────────────────────

interface ScoredCandidate {
  article:      Article;
  segment:      LawSegment | null;
  template:     TemplateId;
  score:        number;
}

function scoreArticle(article: Article): ScoredCandidate {
  // Mejor segmento: priorizar practicalExample > plainExplanation
  const bestSeg = article.segments
    ?.filter(s => s.plainExplanation)
    .sort((a, b) => {
      const aHas = a.practicalExample ? 1 : 0;
      const bHas = b.practicalExample ? 1 : 0;
      return bHas - aHas;
    })[0] ?? null;

  if (bestSeg?.practicalExample) {
    return { article, segment: bestSeg, template: 'EJEMPLO', score: 100 };
  }
  if (article.plainLanguageExplanation) {
    return { article, segment: null, template: 'RESUMEN', score: 70 };
  }
  if (article.practicalEffects?.length > 0) {
    return { article, segment: null, template: 'EFECTOS', score: 50 };
  }
  if (bestSeg?.plainExplanation) {
    return { article, segment: bestSeg, template: 'RESUMEN', score: 40 };
  }
  return { article, segment: null, template: 'BASE', score: 0 };
}

// Evita artículos introductorios/de alcance que no aportan contenido útil
const SKIP_ARTICLE_PATTERNS = /^(objeto|alcance|ámbito|definicion|definición|ambito|aplicacion|aplicación|vigencia|derogacion|derogación)/i;

function isSkippable(article: Article): boolean {
  const title = (article.title ?? '').toLowerCase();
  return SKIP_ARTICLE_PATTERNS.test(title);
}

// ── public API ────────────────────────────────────────────────────────────────

@Injectable()
export class PostGeneratorService {
  private readonly logger = new Logger(PostGeneratorService.name);

  generate(
    law:            Law,
    usedArticles:   Set<string>,  // artículos ya usados recientemente
  ): GenerateResult | null {
    // Intentar con artículos con buen contenido primero
    const candidates: ScoredCandidate[] = (law.articles ?? [])
      .filter(a => !usedArticles.has(`${law.id}::${a.number}`))
      .filter(a => !isSkippable(a))
      .map(scoreArticle)
      .filter(c => c.score > 0)
      .sort((a, b) => b.score - a.score);

    if (candidates.length === 0) {
      // Fallback BASE: usar resumen de la ley completa
      this.logger.debug(`[generator] ${law.id} → BASE fallback`);
      const utmCtx = utmContent(law.id, '0');
      return {
        postText:      buildBase(law),
        commentText:   this.buildBaseComment(law, utmCtx),
        hashtags:      '',
        lawId:         law.id,
        lawTitle:      lawName(law),
        articleNumber: '0',
        utmContent:    utmCtx,
        templateUsed:  'BASE',
      };
    }

    const best = candidates[0];
    const { article, segment, template } = best;
    const utmCtx = utmContent(law.id, article.number);

    let postText: string;
    switch (template) {
      case 'EJEMPLO':
        postText = buildEjemplo(law, article, segment!);
        break;
      case 'RESUMEN':
        postText = segment
          ? buildResumen(law, { ...article, plainLanguageExplanation: segment.plainExplanation })
          : buildResumen(law, article);
        break;
      case 'EFECTOS':
        postText = buildEfectos(law, article);
        break;
      default:
        postText = buildBase(law);
    }

    this.logger.debug(`[generator] ${law.id} Art.${article.number} → ${template} (score ${best.score})`);

    return {
      postText,
      commentText:   buildCommentText(law, article.number, utmCtx),
      hashtags:      '',
      lawId:         law.id,
      lawTitle:      lawName(law),
      articleNumber: article.number,
      utmContent:    utmCtx,
      templateUsed:  template,
    };
  }

  private buildBaseComment(law: Law, utmCtx: string): string {
    const path = computeFrontendPath(law);
    const url  = `${FRONTEND_BASE}${path}?${UTM_BASE}&utm_content=${utmCtx}`;
    return `${lawName(law)} — ley completa:\n${url}`;
  }
}
