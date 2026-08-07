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

export function resolveTestDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  if (process.env.TEST_AGAINST_PROD === '1') {
    const envPath = path.resolve(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
      const line = fs
        .readFileSync(envPath, 'utf8')
        .split(/\r?\n/)
        .find((l) => l.startsWith('DATABASE_URL='));
      if (line) {
        const url = line
          .slice('DATABASE_URL='.length)
          .replace(/^["']|["']$/g, '')
          .trim();
        // Sin este aviso es demasiado fácil correr los specs contra la base real
        // sin darse cuenta de que se hizo.
        console.warn('[specs] TEST_AGAINST_PROD=1 → corriendo contra PRODUCCIÓN');
        return url;
      }
    }
  }

  return LOCAL_URL;
}

/** Llamar al tope del spec, antes de instanciar PrismaClient. */
export function setupTestDatabase(): void {
  process.env.DATABASE_URL = resolveTestDatabaseUrl();
}
