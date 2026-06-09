/**
 * Fase 4 del refactor hardcodeos→BD: migra las relaciones de
 * RELACIONES_CURADAS (+ regla const-*→CN) a la tabla `norm_relations`.
 * Idempotente (upsert con onConflict source_id,target_id,type).
 * Uso: DOTENV_CONFIG_PATH=.env npx tsx -r dotenv/config scripts/migrate-curated-relations.ts
 */
import 'reflect-metadata';
import { createClient } from '@supabase/supabase-js';
import { RELACIONES_CURADAS, MIGRATED_LABELS } from '../src/data/relations-curadas';

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
if (!URL || !KEY) { console.error('Faltan SUPABASE_URL / SUPABASE_SERVICE_KEY'); process.exit(1); }
const sb = createClient(URL, KEY);

type Row = { source_id: string; target_id: string; type: string; target_label: string; description: string | null };

async function run() {
  const { data: norms, error } = await sb.from('norms').select('id, common_name, title');
  if (error || !norms) { console.error('No pude leer norms:', error?.message); process.exit(1); }
  const ids = new Set(norms.map((n) => n.id));
  const labelOf = (id: string): string | null => {
    const n = norms.find((x) => x.id === id);
    return n ? ((n.common_name as string) ?? (n.title as string)) : (MIGRATED_LABELS[id] ?? null);
  };

  const rows: Row[] = [];
  for (const [srcId, edges] of Object.entries(RELACIONES_CURADAS)) {
    if (!ids.has(srcId)) continue;
    for (const e of edges) {
      const label = labelOf(e.target);
      if (!label || e.target === srcId || !ids.has(e.target)) continue;
      rows.push({ source_id: srcId, target_id: e.target, type: e.type, target_label: label, description: e.description ?? null });
    }
  }
  const cnLabel = labelOf('constitucion-nacional');
  if (cnLabel) {
    for (const n of norms) {
      if (!n.id.startsWith('const-') || n.id === 'constitucion-nacional') continue;
      rows.push({ source_id: n.id, target_id: 'constitucion-nacional', type: 'RELACIONADA', target_label: cnLabel, description: 'Constitución provincial dentro del marco federal de la Constitución Nacional (art. 5 CN).' });
    }
  }

  const { error: upErr } = await sb.from('norm_relations').upsert(rows, { onConflict: 'source_id,target_id,type', ignoreDuplicates: true });
  if (upErr) { console.error('Upsert falló:', upErr.message); process.exit(1); }
  console.log(`✓ ${rows.length} relaciones curadas migradas a norm_relations.`);
}
run().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
