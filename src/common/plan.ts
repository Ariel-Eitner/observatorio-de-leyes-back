/**
 * Plan EFECTIVO de un usuario. Es la única función que decide si alguien es
 * Pro; todo lo que gatea (cupos, exportar, documentos del Redactor, carpetas)
 * pasa por acá y no por `user.plan` a secas.
 *
 * Reglas (docs/reglas-por-plan.html):
 *   - admin → pro (sin límites, para poder probar todo).
 *   - plan='pro' con planUntil vencido → free. El plan no se "apaga" solo en la
 *     base; se apaga acá, al evaluarlo.
 *   - fundador → pro (el beneficio ya lo carga benefits.service como plan='pro'
 *     + planUntil; esto es la red por si quedó isFounder sin plan).
 */
export type PlanTier = 'free' | 'pro';

export interface PlanFields {
  plan: string | null;
  planUntil: Date | null;
  isFounder: boolean;
  isAdmin: boolean;
}

export function effectivePlan(u: PlanFields | null | undefined, now = new Date()): PlanTier {
  if (!u) return 'free';
  if (u.isAdmin) return 'pro';
  if (u.plan === 'pro' || u.plan === 'proplus' || u.plan === 'premium') {
    if (!u.planUntil || u.planUntil.getTime() > now.getTime()) return 'pro';
  }
  if (u.isFounder) return 'pro';
  return 'free';
}

export const PLAN_SELECT = { plan: true, planUntil: true, isFounder: true, isAdmin: true } as const;
