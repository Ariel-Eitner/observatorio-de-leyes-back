/**
 * Backfill de short_code / aliases / is_destacada en la tabla `norms` desde el
 * mapa hardcodeado LAW_STATIC_META (Fase 3 del refactor hardcodeos→BD).
 * Uso: DOTENV_CONFIG_PATH=.env npx tsx -r dotenv/config scripts/backfill-static-meta.ts
 */
import 'reflect-metadata';
import { createClient } from '@supabase/supabase-js';
import { LAW_STATIC_META } from '../src/laws/laws.service';

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
if (!URL || !KEY) { console.error('Faltan SUPABASE_URL / SUPABASE_SERVICE_KEY'); process.exit(1); }
const sb = createClient(URL, KEY);

async function run() {
  const entries = Object.entries(LAW_STATIC_META);
  let ok = 0;
  const missing: string[] = [];
  for (const [id, meta] of entries) {
    const { data, error } = await sb
      .from('norms')
      .update({
        short_code: meta.shortCode ?? null,
        aliases: meta.aliases ?? [],
        is_destacada: meta.isDestacada ?? false,
      })
      .eq('id', id)
      .select('id');
    if (error) { console.error(`✗ ${id}: ${error.message}`); continue; }
    if (data && data.length) ok++;
    else missing.push(id);
  }
  console.log(`✓ ${ok}/${entries.length} normas actualizadas.`);
  if (missing.length) console.log(`· Sin match en norms (no cargadas): ${missing.join(', ')}`);
}
run().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
