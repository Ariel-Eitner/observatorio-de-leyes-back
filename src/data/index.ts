/**
 * Fuente de normas EN CÓDIGO.
 *
 * Tras la migración completa a la base de datos, estos arrays quedaron vacíos:
 * TODAS las normas se sirven desde la BD vía NormsDbService (LawsService las
 * hidrata al arrancar). La estructura se conserva para:
 *   - poder cargar normas en código de forma puntual si hiciera falta,
 *   - mantener applyCuratedRelations / los tipos disponibles,
 *   - no romper los consumidores que importan NORMAS_CLAVE / ALL_LAWS.
 */
import type { Law } from '../common/types/law.types';
import { applyCuratedRelations } from './relations-curadas';

// Normas con página dedicada — migradas a la BD.
export const NORMAS_CLAVE: Law[] = [];

// Listado general. TODAS las normas (incluido el DNU 70/2023) viven en la BD;
// acá quedarían solo las que se estén cargando en código antes de migrarlas.
export const ALL_LAWS: Law[] = [];

// No-op mientras los arrays estén vacíos; se mantiene para normas en código futuras.
applyCuratedRelations([...NORMAS_CLAVE, ...ALL_LAWS]);
