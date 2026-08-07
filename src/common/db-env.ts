/**
 * Contra qué base está corriendo este proceso.
 *
 * POR QUÉ EXISTE: el docker-compose "local" recibe el mismo DATABASE_URL que
 * producción, así que desarrollo y producción son la MISMA base. Mientras eso
 * siga así, lo mínimo es que el proceso sepa —y diga— dónde está parado, y que
 * las operaciones destructivas se nieguen a correr por accidente.
 *
 * Se resuelve por `DB_ENV` cuando está seteado (fuente de verdad explícita) y,
 * si no, se infiere del host del DATABASE_URL. Inferir es el fallback, no el
 * mecanismo: un host nuevo de Supabase no debería volver "development" a una
 * base que en realidad es la de producción, así que ante la duda dice que sí.
 */
export interface DbTarget {
  isProduction: boolean;
  label: string;
}

const HOSTS_PRODUCCION = [/\.pooler\.supabase\.com$/i, /\.supabase\.co$/i];

function hostDeLaUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

export function describeDbTarget(): DbTarget {
  const declarado = (process.env.DB_ENV ?? '').trim().toLowerCase();
  const host = hostDeLaUrl(process.env.DATABASE_URL) ?? 'desconocido';

  if (declarado === 'production') return { isProduction: true, label: `PRODUCCIÓN (${host})` };
  if (declarado === 'development') return { isProduction: false, label: `desarrollo (${host})` };

  const pareceProd = HOSTS_PRODUCCION.some((re) => re.test(host));
  return {
    isProduction: pareceProd,
    label: pareceProd ? `PRODUCCIÓN (${host}, inferido)` : `desarrollo (${host})`,
  };
}

/**
 * Las operaciones que borran datos en masa solo corren si quien despliega lo
 * habilitó a propósito. Sin esto, un `DELETE /api/events` disparado desde el
 * panel de un entorno local vacía el tracking real.
 */
export function destructiveOpsAllowed(): boolean {
  return process.env.ALLOW_DESTRUCTIVE === 'true';
}
