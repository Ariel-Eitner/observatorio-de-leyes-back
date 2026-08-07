/**
 * Helpers compartidos por los servicios de admin-data.
 *
 * REGLA DE ORO DE ESTE MÓDULO: los endpoints devuelven **snake_case**, igual que
 * lo hacía Supabase. El panel de admin ya tiene decenas de componentes cliente
 * tipados contra ese shape (`comprobante_url`, `published_at`, `mp_payment_id`…);
 * cambiarlo a camelCase obligaría a tocarlos todos sin ganar nada. Los modelos
 * de Prisma que sí están en camelCase se mapean acá, en el borde.
 */

/** Decimal de Prisma → number. Sale como string por JSON si no se convierte. */
export function num(v: unknown): number {
  if (v === null || v === undefined) return 0;
  return typeof v === 'number' ? v : Number(v.toString());
}

export function numOrNull(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  return typeof v === 'number' ? v : Number(v.toString());
}

/** Date → ISO string. El front compara y formatea fechas como strings ISO. */
export function iso(d: Date | null | undefined): string | null {
  return d ? d.toISOString() : null;
}

/**
 * Columna `@db.Date` → "YYYY-MM-DD".
 *
 * Prisma devuelve un Date a medianoche UTC, que serializado a JSON queda
 * "2026-08-05T00:00:00.000Z". El rollup y el seguimiento comparan estas claves
 * como strings (`day >= today`), así que un timestamp completo rompe el orden.
 */
export function dayKey(d: Date | null | undefined): string | null {
  return d ? d.toISOString().slice(0, 10) : null;
}

/** Escapa los comodines de LIKE para poder comparar un email literal. */
export function likeLiteral(s: string): string {
  return s.replace(/([\\%_])/g, '\\$1');
}
