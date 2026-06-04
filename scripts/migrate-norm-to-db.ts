/**
 * Migra normas (objetos Law) desde el código a las tablas relacionales de la BD.
 * Idempotente por norma: borra (cascade) y reinserta.
 *
 * Uso:
 *   SUPABASE_URL=... SUPABASE_SERVICE_KEY=... \
 *   npx ts-node --project tsconfig.json -r tsconfig-paths/register \
 *     scripts/migrate-norm-to-db.ts
 *
 * Editar NORMS_TO_MIGRATE para elegir qué migrar.
 */
import { createClient } from '@supabase/supabase-js';
import type { Law } from '../src/common/types/law.types';
// Importar data/index ejecuta applyCuratedRelations y muta las relaciones de los
// objetos compartidos. Debe ir antes de leer las normas para migrarlas con sus
// relaciones curadas.
import '../src/data/index';

// Normas a migrar en esta corrida: importar arriba la(s) norma(s) y listarlas acá.
// Ej.: import { LEY_XXXX } from '../src/data/ley-xxxx/index';  →  [LEY_XXXX]
// (Constituciones nacional + provinciales ya migradas y borradas del código.)
const NORMS_TO_MIGRATE: Law[] = [];

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
if (!URL || !KEY) {
  console.error('Faltan SUPABASE_URL / SUPABASE_SERVICE_KEY en el entorno.');
  process.exit(1);
}
const sb = createClient(URL, KEY);

function chk(label: string, error: { message: string } | null) {
  if (error) {
    console.error(`✗ ${label}: ${error.message}`);
    process.exit(1);
  }
}

async function migrate(law: Law) {
  // 0. Limpieza idempotente (cascade borra sections/titles/articles/segments/etc.)
  chk(`${law.id} limpieza`, (await sb.from('norms').delete().eq('id', law.id)).error);

  // 1. norms
  chk(`${law.id} norms`, (await sb.from('norms').insert({
    id: law.id, number: law.number, title: law.title, common_name: law.commonName ?? null,
    summary: law.summary, category: law.category ?? null, year: law.year,
    sanction_date: law.sanctionDate, promulgation_date: law.promulgationDate,
    publication_date: law.publicationDate, effective_date: law.effectiveDate,
    derogated_date: law.derogatedDate, bo_number: law.boNumber, status: law.status,
    jurisdiction: law.jurisdiction, norm_type: law.normType, issuing_body: law.issuingBody,
    full_text: law.fullText, source_url: law.sourceUrl, article_count: law.articleCount,
    executive_summary: law.executiveSummary, objective: law.objective,
    problem_it_solves: law.problemItSolves, practical_impact: law.practicalImpact,
    topics: law.topics ?? [], keywords: law.keywords ?? [],
    related_norms: law.relatedNorms ?? [], affected_subjects: law.affectedSubjects ?? [],
    created_at: law.createdAt, updated_at: law.updatedAt,
  })).error);

  // 2. norm_metadata
  if (law.metadata) {
    const m = law.metadata;
    chk(`${law.id} metadata`, (await sb.from('norm_metadata').insert({
      norm_id: law.id, main_topic: m.mainTopic, subtopics: m.subtopics ?? [],
      related_laws: m.relatedLaws ?? [], regulations: m.regulations ?? [],
      modifying_norms: m.modifyingNorms ?? [], derogating_norms: m.derogatingNorms ?? [],
      jurisprudence: m.jurisprudence ?? [], doctrine: m.doctrine ?? [],
      obligations: m.obligations ?? [], rights: m.rights ?? [], sanctions: m.sanctions ?? [],
      use_cases: m.useCases ?? [], faq: m.faq ?? null,
    })).error);
  }

  // 3. sections + titles
  const sections = law.sections ?? [];
  if (sections.length) {
    chk(`${law.id} sections`, (await sb.from('norm_sections').insert(
      sections.map((s, i) => ({
        id: s.id, norm_id: law.id, number: s.number, name: s.name,
        article_start: s.articleStart, article_end: s.articleEnd, ord: i,
      })),
    )).error);
    const titles = sections.flatMap((s) =>
      (s.titles ?? []).map((t, i) => ({
        id: t.id, section_id: s.id, norm_id: law.id, number: t.number, name: t.name,
        article_start: t.articleStart, article_end: t.articleEnd, ord: i,
      })),
    );
    if (titles.length) chk(`${law.id} titles`, (await sb.from('norm_titles').insert(titles)).error);
  }

  // 4. articles
  if (law.articles.length) {
    chk(`${law.id} articles`, (await sb.from('articles').insert(
      law.articles.map((a) => ({
        id: a.id, norm_id: law.id, number: a.number, title: a.title, body: a.text,
        plain_language_explanation: a.plainLanguageExplanation, ord: a.order,
        status: a.status ?? null, effective_date: a.effectiveDate ?? null,
        derogated_date: a.derogatedDate ?? null, practical_effects: a.practicalEffects ?? [],
        examples: a.examples ?? [], related_articles: a.relatedArticles ?? [],
        jurisprudence: a.jurisprudence ?? [], regulations: a.regulations ?? [],
        keywords: a.keywords ?? [], jurisprudence_refs: a.jurisprudenceRefs ?? null,
        visual_content: a.visualContent ?? null,
      })),
    )).error);
  }

  // 5. segments
  const segments = law.articles.flatMap((a) =>
    (a.segments ?? []).map((s) => ({
      id: s.id, article_id: a.id, norm_id: law.id, article_number: s.articleNumber,
      segment_type: s.segmentType, body: s.text, plain_explanation: s.plainExplanation,
      practical_example: s.practicalExample, refs: s.references ?? [], ord: s.order,
    })),
  );
  if (segments.length) chk(`${law.id} segments`, (await sb.from('segments').insert(segments)).error);

  // 6. article_amendments
  const artAmends = law.articles.flatMap((a) =>
    (a.amendments ?? []).map((am) => ({
      id: am.id, article_id: a.id, modifying_law: am.modifyingLaw,
      modifying_date: am.modifyingDate, previous_text: am.previousText,
      new_text: am.newText, description: am.description, created_at: am.createdAt,
    })),
  );
  if (artAmends.length) chk(`${law.id} art_amend`, (await sb.from('article_amendments').insert(artAmends)).error);

  // 7. norm_amendments
  if ((law.amendments ?? []).length) {
    chk(`${law.id} norm_amend`, (await sb.from('norm_amendments').insert(
      law.amendments.map((am) => ({
        id: am.id, norm_id: law.id, modifying_law: am.modifyingLaw,
        modifying_date: am.modifyingDate, description: am.description,
        type: am.type ?? null, created_at: am.createdAt,
      })),
    )).error);
  }

  // 8. annexes
  if ((law.annexes ?? []).length) {
    chk(`${law.id} annexes`, (await sb.from('annexes').insert(
      law.annexes.map((an, i) => ({
        id: an.id, norm_id: law.id, number: an.number, title: an.title,
        content: an.content, ord: an.order ?? i,
      })),
    )).error);
  }

  // 9. norm_relations
  if ((law.relations ?? []).length) {
    chk(`${law.id} relations`, (await sb.from('norm_relations').insert(
      law.relations.map((r) => ({
        source_id: law.id, target_id: r.targetLawId, target_label: r.targetLawLabel,
        type: r.type, description: r.description,
      })),
    )).error);
  }

  console.log(`✓ ${law.id} (${law.articles.length} arts, ${segments.length} segs, ${(law.relations ?? []).length} rels)`);
}

async function run() {
  console.log(`Migrando ${NORMS_TO_MIGRATE.length} normas…\n`);
  for (const law of NORMS_TO_MIGRATE) {
    await migrate(law);
  }
  console.log(`\n✅ ${NORMS_TO_MIGRATE.length} normas migradas.`);
}

run().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
