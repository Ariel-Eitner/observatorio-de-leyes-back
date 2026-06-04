/**
 * Fuente única de leyes del sistema.
 *
 * Para agregar una ley nueva:
 *   1. Crear src/data/{slug}.data.ts con la constante exportada
 *   2. Importarla aquí y agregarla a NORMAS_CLAVE (orden alfabético)
 *   3. Listo — búsqueda, stats y referencias inline la detectan automáticamente
 */

// CONSTITUCION_NACIONAL migrada a la BD: se sirve vía NormsDbService (LawsService.onModuleInit).
// El data file ./constitucion-nacional/ queda huérfano (sin borrar) por si hay que revertir.
import { CODIGO_PENAL } from './codigo-penal/index';
import { LEY_20744 } from './ley-20744/index';
import { CODIGO_ADUANERO } from './codigo-aduanero/index';
import { LEY_27150 } from './ley-27150/index';
import { LEY_26639 } from './ley-26639/index';
import { CODIGO_CIVIL_COMERCIAL } from './codigo-civil-comercial/index';
import { ALL_LAWS as LAWS_BASE } from './ley-25326.data';
import { DECRETO_207_2011 } from './decreto-207-2011.data';
import { LEY_27499 } from './ley-27499/index';
import { LEY_26743 } from './ley-26743/index';
import { LEY_26618 } from './ley-26618/index';
import { LEY_26485 } from './ley-26485/index';
import { LEY_27610 } from './ley-27610/index';
import { LEY_26657 } from './ley-26657/index';
import { LEY_27275 } from './ley-27275/index';
import { LEY_24240 } from './ley-24240/index';
import { LEY_26061 } from './ley-26061/index';
import { LEY_26206 } from './ley-26206/index';
import { CARTA_ONU } from './carta-onu/index';
import { CONVENCION_DERECHOS_NINO } from './convencion-derechos-nino/index';
import { LEY_26842 } from './ley-26842/index';
import { LEY_27801 } from './ley-27801/index';
import { LEY_27742 } from './ley-27742/index';
import { LEY_27802 } from './ley-27802.data';
import { DECRETO_315_2026 } from './decreto-315-2026.data';
import { RG_ARCA_5844_2026 } from './rg-arca-5844-2026.data';
import { DECRETO_407_2026 } from './decreto-407-2026.data';
import { LEY_27642 } from './ley-27642/index';
import { DECRETO_151_2022 } from './decreto-151-2022/index';
import { LEY_23592 } from './ley-23592/index';
import { LEY_11544 } from './ley-11544/index';
import { LEY_22278 } from './ley-22278/index';
import type { Law } from '../common/types/law.types';
import { applyCuratedRelations } from './relations-curadas';
import { CONSTITUCIONES_PROVINCIALES } from './constituciones-provinciales/index';

// Leyes con página dedicada en el visor (orden alfabético por nombre visible)
export const NORMAS_CLAVE: Law[] = [
  CARTA_ONU,                      // Carta de las Naciones Unidas
  CONVENCION_DERECHOS_NINO,       // Convención sobre los Derechos del Niño
  CODIGO_ADUANERO,          // Código Aduanero
  CODIGO_CIVIL_COMERCIAL,   // Código Civil y Comercial
  CODIGO_PENAL,             // Código Penal
  LEY_27150,                // Código Procesal Penal Federal
  // CONSTITUCION_NACIONAL → migrada a la BD (se sirve desde NormsDbService)
  LEY_20744,                // Ley de Contrato de Trabajo
  LEY_27742,                // Ley del RIGI
];

// Leyes del listado general /api/laws
export const ALL_LAWS: Law[] = [
  ...LAWS_BASE,
  LEY_26639,         // Ley de Glaciares
  DECRETO_207_2011,  // Decreto reglamentario Ley de Glaciares
  LEY_27499,         // Ley Micaela
  LEY_26743,         // Ley de Identidad de Género
  LEY_26618,         // Ley de Matrimonio Igualitario
  LEY_26485,         // Ley de Violencia contra la Mujer
  LEY_27610,         // Ley IVE
  LEY_26657,         // Ley de Salud Mental
  LEY_27275,         // Ley de Acceso a la Información Pública
  LEY_24240,         // Ley de Defensa del Consumidor
  LEY_26061,         // Ley de Protección Integral NNyA
  LEY_26206,         // Ley de Educación Nacional
  LEY_27642,         // Ley de Etiquetado Frontal
  DECRETO_151_2022,  // Reglamentación Etiquetado Frontal
  LEY_27801,         // Ley Penal Juvenil
  LEY_27802,         // Ley de Modernización Laboral
  DECRETO_315_2026,  // Reglamentación del RIFL (Título XX Ley 27.802)
  RG_ARCA_5844_2026, // RG ARCA 5844/2026 — procedimiento operativo del RIFL
  DECRETO_407_2026,  // Reglamentación LCT (recibo de sueldo) — Ley 27.802
  LEY_23592,         // Ley Antidiscriminatoria
  LEY_11544,         // Ley de Jornada de Trabajo
  LEY_22278,         // Régimen Penal de la Minoridad (derogada por Ley 27.801)
  LEY_26842,         // Ley de Trata de Personas
];

// Merge de relaciones curadas → grafo legal determinístico (dedup por type+target).
applyCuratedRelations([...NORMAS_CLAVE, ...ALL_LAWS, ...CONSTITUCIONES_PROVINCIALES]);
