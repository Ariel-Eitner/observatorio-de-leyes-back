/**
 * Contra qué base corren los specs que leen datos.
 *
 * ORDEN DE RESOLUCIÓN (el primero que exista gana):
 *
 *   1. `DATABASE_URL` del entorno — es lo que usa el CI (secret del workflow).
 *   2. La base LOCAL (localhost:5433) — el default para desarrollo.
 *   3. `TEST_AGAINST_PROD=1` → el `DATABASE_URL` del .env del backend, o sea
 *      producción. Explícito a propósito.
 *
 * POR QUÉ CAMBIÓ (6-ago-2026): antes estos specs leían el `.env` del backend sin
 * preguntar, así que `npx jest` en la máquina de cualquiera iba directo contra
 * producción. Además de ser lento y ruidoso, hacía imposible el flujo que ahora
 * queremos: cargar una tanda de normas en local, validarla con los specs, y
 * recién después subirla.
 *
 * Los specs se saltan solos si la base no responde (`dbOk`), salvo en CI, donde
 * `completeness.spec.ts` falla a propósito para que un secret roto no pase como
 * "todo verde".
 */
import * as fs from 'fs';
import * as path from 'path';

const LOCAL_URL =
  'postgresql://observatorio:observatorio@localhost:5433/observatorio?schema=public';

/** El `DATABASE_URL` que está escrito en el `.env` del backend (producción), o null. */
function urlDelEnvFile(): string | null {
  const envPath = path.resolve(__dirname, '../../.env');
  if (!fs.existsSync(envPath)) return null;
  const line = fs
    .readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .find((l) => l.startsWith('DATABASE_URL='));
  if (!line) return null;
  return line.slice('DATABASE_URL='.length).replace(/^["']|["']$/g, '').trim();
}

export function resolveTestDatabaseUrl(): string {
  const delEnvFile = urlDelEnvFile();

  if (process.env.TEST_AGAINST_PROD === '1') {
    if (delEnvFile) {
      // Sin este aviso es demasiado fácil correr los specs contra la base real
      // sin darse cuenta de que se hizo.
      console.warn('[specs] TEST_AGAINST_PROD=1 → corriendo contra PRODUCCIÓN');
      return delEnvFile;
    }
  }

  // OJO — por qué NO alcanza con `if (process.env.DATABASE_URL) return ...`:
  // `import { PrismaClient } from '@prisma/client'` corre ANTES de esta función (es un
  // import, arriba del archivo) y al cargarse **puebla `process.env.DATABASE_URL` con el
  // `.env` del backend**, que apunta a producción. Con el chequeo simple, esa variable
  // "existía" siempre y los specs corrían contra la base REAL en silencio: el flujo de
  // cargar una tanda en local, validarla y recién después subirla nunca miró local.
  // Detectado el 10-ago-2026, verificado con
  //   node -e "require('@prisma/client'); console.log(process.env.DATABASE_URL)"
  // Por eso el valor sólo se respeta si NO es idéntico al del `.env`: si coincide, lo puso
  // dotenv y no una decisión explícita. En CI no hay `.env` (está gitignored), así que el
  // secret del workflow entra por acá sin problema.
  const delEntorno = process.env.DATABASE_URL;
  if (delEntorno && delEntorno !== delEnvFile) return delEntorno;

  return LOCAL_URL;
}

/** Llamar al tope del spec, antes de instanciar PrismaClient. */
export function setupTestDatabase(): void {
  process.env.DATABASE_URL = resolveTestDatabaseUrl();
}
