import { Injectable, BadRequestException, Logger } from '@nestjs/common';

// ─── Base de conocimiento legal ───────────────────────────────────────────────

interface LawEntry {
  nombre: string;
  estado: 'VIGENTE' | 'MODIFICADA' | 'DEROGADA';
  nota: string | null;
  urlObservatorio: string | null;
  articleUrlBase: string | null; // base para links por artículo, p.ej. '/codigos/civil-comercial/articulo/'
  articles?: Record<string, { estado: 'VIGENTE' | 'MODIFICADA' | 'DEROGADA'; nota: string }>;
}

const LAW_DB: Record<string, LawEntry> = {
  '26994': {
    nombre: 'Código Civil y Comercial de la Nación',
    estado: 'VIGENTE',
    nota: null,
    urlObservatorio: '/codigos/civil-comercial',
    articleUrlBase: '/codigos/civil-comercial/articulo/',
    articles: {
      '1187': { estado: 'VIGENTE', nota: 'Definición del contrato de locación' },
      '1188': { estado: 'VIGENTE', nota: 'Forma y prueba' },
      '1190': { estado: 'VIGENTE', nota: 'Continuadores en la locación' },
      '1191': { estado: 'VIGENTE', nota: 'Continuación de la locación' },
      '1196': { estado: 'MODIFICADA', nota: 'Depósito en garantía — modificado por Ley 27.737' },
      '1197': { estado: 'VIGENTE', nota: 'Plazo máximo' },
      '1198': { estado: 'VIGENTE', nota: 'Plazo mínimo de locación (2 años para habitación, 3 para otros usos)' },
      '1199': { estado: 'VIGENTE', nota: 'Excepciones al plazo mínimo' },
      '1200': { estado: 'VIGENTE', nota: 'Habitación con muebles' },
      '1201': { estado: 'VIGENTE', nota: 'Obligación de entregar el inmueble' },
      '1204': { estado: 'VIGENTE', nota: 'Conservación de la cosa' },
      '1208': { estado: 'VIGENTE', nota: 'Pagar cargas y contribuciones' },
      '1209': { estado: 'VIGENTE', nota: 'Expensas extraordinarias a cargo del locador' },
      '1210': { estado: 'VIGENTE', nota: 'Expensas ordinarias a cargo del locatario' },
      '1219': { estado: 'VIGENTE', nota: 'Extinción de la locación' },
      '1220': { estado: 'VIGENTE', nota: 'Resolución imputable al locatario' },
      '1221': { estado: 'MODIFICADA', nota: 'Resolución anticipada — preaviso modificado por Ley 27.737 (dic. 2023)' },
      '1222': { estado: 'VIGENTE', nota: 'Intimación de pago — requisito previo al desalojo' },
      '1223': { estado: 'VIGENTE', nota: 'Renovación del contrato' },
      '1224': { estado: 'VIGENTE', nota: 'Facultad de retención' },
      '1225': { estado: 'VIGENTE', nota: 'Continuación de la garantía vencido el plazo' },
      '1226': { estado: 'VIGENTE', nota: 'Normas supletorias' },
    },
  },
  '27551': {
    nombre: 'Ley de Alquileres',
    estado: 'MODIFICADA',
    nota: 'El art. 14 (índice ICL) fue derogado por la Ley 27.737 (dic. 2023). El resto sigue vigente con modificaciones.',
    urlObservatorio: null,
    articleUrlBase: null,
    articles: {
      '6':  { estado: 'VIGENTE', nota: 'Plazo mínimo de locación: 3 años para inmuebles con destino habitacional' },
      '7':  { estado: 'VIGENTE', nota: 'Depósito: máximo 1 mes de alquiler al valor del primer mes' },
      '9':  { estado: 'VIGENTE', nota: 'Gastos de gestión inmobiliaria: a cargo exclusivo del locador' },
      '10': { estado: 'VIGENTE', nota: 'Actualizaciones: índice a convenir entre partes (post-derogación art. 14)' },
      '13': { estado: 'VIGENTE', nota: 'Rescisión anticipada: preaviso de 3 meses' },
      '14': { estado: 'DEROGADA', nota: 'Derogado por Ley 27.737 (dic. 2023). El ICL ya no es el índice obligatorio.' },
    },
  },
  '27737': {
    nombre: 'Reforma de locaciones urbanas',
    estado: 'VIGENTE',
    nota: 'Derogó el art. 14 de la Ley 27.551 (ICL) y modificó el régimen de locaciones. Vigente desde diciembre 2023.',
    urlObservatorio: null,
    articleUrlBase: null,
  },
  '23091': {
    nombre: 'Ley de Locaciones Urbanas (anterior)',
    estado: 'DEROGADA',
    nota: 'Derogada por el Código Civil y Comercial (Ley 26.994) en 2015. Puede aparecer citada en contratos anteriores.',
    urlObservatorio: null,
    articleUrlBase: null,
  },
  '20744': {
    nombre: 'Ley de Contrato de Trabajo (LCT)',
    estado: 'VIGENTE',
    nota: null,
    urlObservatorio: '/leyes/20744-ley-de-contrato-de-trabajo',
    articleUrlBase: '/leyes/20744-ley-de-contrato-de-trabajo/articulo/',
  },
  '24240': {
    nombre: 'Ley de Defensa del Consumidor',
    estado: 'VIGENTE',
    nota: null,
    urlObservatorio: '/leyes/ley-24240',
    articleUrlBase: '/leyes/ley-24240/articulo/',
  },
  '25326': {
    nombre: 'Ley de Protección de Datos Personales',
    estado: 'VIGENTE',
    nota: null,
    urlObservatorio: '/leyes/ley-25326',
    articleUrlBase: '/leyes/ley-25326/articulo/',
  },
  '19550': {
    nombre: 'Ley General de Sociedades',
    estado: 'VIGENTE',
    nota: null,
    urlObservatorio: null,
    articleUrlBase: null,
  },
  '11723': {
    nombre: 'Ley de Propiedad Intelectual',
    estado: 'VIGENTE',
    nota: null,
    urlObservatorio: null,
    articleUrlBase: null,
  },
};

const MONTH_MAP: Record<string, string> = {
  enero: '01', febrero: '02', marzo: '03', abril: '04',
  mayo: '05', junio: '06', julio: '07', agosto: '08',
  septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12',
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContractParte {
  rol: string;
  nombre: string;
  documento: { tipo: string; numero: string } | null;
  domicilio: string | null;
  email: string | null;
  nota: string | null;
}

export interface ContractArticulo {
  numero: string;
  estado: 'VIGENTE' | 'MODIFICADA' | 'DEROGADA' | null;
  nota: string | null;
  url: string | null;
}

export interface ContractLey {
  nombre: string;
  numero: string | null;
  articulos: string[];           // números como strings, para compatibilidad
  articulosDetalle: ContractArticulo[];  // con URL y estado por artículo
  uso: string;
  estado: 'VIGENTE' | 'MODIFICADA' | 'DEROGADA';
  nota: string | null;
  urlObservatorio: string | null;
}

export interface ContractRef {
  texto: string;   // ej. "Ley 27.551 art. 14" o "CCyC art. 1222"
  url: string | null;
}

export interface ContractAlerta {
  severidad: 'ERROR' | 'ADVERTENCIA' | 'INFO';
  titulo: string;
  descripcion: string;
  clausula: string | null;
  referencias: ContractRef[];
}

export interface ContractAnalysis {
  tipo: string;
  titulo: string;
  resumen: string;
  partes: ContractParte[];
  bien: { tipo: string; descripcion: string; direccion: string | null } | null;
  plazos: { inicio: string | null; fin: string | null; duracionMeses: number | null; estado: string } | null;
  precio: { montoInicial: number | null; moneda: string; periodicidad: string; actualizacion: string | null; actualizacionRef: ContractRef | null; vencimientoPago: string | null } | null;
  deposito: { monto: number | null; condiciones: string | null } | null;
  leyes: ContractLey[];
  alertas: ContractAlerta[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Palabras que no pueden ser parte de un nombre de persona
const NON_NAME_TOKENS = new Set([
  'DNI', 'CUIL', 'CUIT', 'LE', 'LC', 'EN', 'DE', 'LA', 'EL', 'LOS', 'LAS',
  'CON', 'SU', 'SR', 'SRA', 'SEÑOR', 'SEÑORA', 'CARÁCTER', 'CARACTER',
  'PARTE', 'PARTES', 'CONTRATO', 'LEY', 'ART', 'LOCADOR', 'LOCATARIA',
  'LOCATARIO', 'GARANTE', 'FIADOR', 'EMPLEADOR', 'EMPLEADO',
  // Sufijos de personas jurídicas — se eliminan del final del nombre
  'SA', 'SRL', 'SAS', 'SCR', 'LTDA', 'LLC', 'INC',
]);

// Palabras que NO pueden ser la PRIMERA palabra de un nombre de persona
// (verbos, preposiciones, artículos, conectores, adverbios comunes, entidades jurídicas)
const INVALID_NAME_STARTERS = new Set([
  'EN', 'A', 'AL', 'DEL', 'POR', 'PARA', 'CON', 'SIN', 'SOBRE', 'BAJO',
  'SE', 'LO', 'LE', 'ME', 'NOS', 'OS', 'LES',
  'QUE', 'Y', 'O', 'NI', 'PERO', 'SIN', 'AUNQUE', 'COMO',
  'UN', 'UNA', 'UNOS', 'UNAS', 'EL', 'LA', 'LOS', 'LAS',
  'ESTE', 'ESTA', 'ESTOS', 'ESTAS', 'ESE', 'ESA',
  'DICHO', 'DICHA', 'DICHOS', 'DICHAS',
  'TODA', 'TODO', 'TODAS', 'TODOS',
  'RESPONSABILIZÁNDOSE', 'RESPONSABILIZANDOSE', 'OBLIGÁNDOSE', 'OBLIGANDOSE',
  'COMPROMETIÉNDOSE', 'COMPROMETIENDOSE', 'DECLARANDO', 'RECONOCIENDO',
  'ASUMIENDO', 'ACEPTANDO', 'MANIFESTANDO',
  'ESTAS', 'DICHAS', 'AMBAS', 'AMBOS',
  // Personas jurídicas — no pueden ser el inicio de un nombre de persona física
  'SUCESION', 'SUCESIÓN', 'SOCIEDAD', 'EMPRESA', 'FUNDACION', 'FUNDACIÓN',
  'ASOCIACION', 'ASOCIACIÓN', 'CORPORACION', 'CORPORACIÓN', 'COMPANIA', 'COMPAÑIA',
]);

/** Valida si un string podría ser un nombre de persona real */
function isValidPersonName(name: string): boolean {
  const words = name.trim().split(/\s+/);
  // Mínimo 2 palabras, máximo 5
  if (words.length < 2 || words.length > 5) return false;
  // La primera palabra no puede ser un conector/verbo/artículo
  if (INVALID_NAME_STARTERS.has(words[0].toUpperCase())) return false;
  // Ninguna palabra puede ser demasiado larga (nombres reales < 20 chars)
  if (words.some(w => w.length > 20)) return false;
  // Ninguna palabra puede tener números
  if (words.some(w => /\d/.test(w))) return false;
  // Al menos la primera y última deben ser capitalizadas (heurística)
  const firstChar = words[0][0];
  const lastChar  = words[words.length - 1][0];
  if (!firstChar || !lastChar) return false;
  return true;
}

/** Limpia tokens de documento del final del nombre y normaliza capitalización */
function cleanAndNormalizeName(raw: string): string {
  // Elimina puntuación de arrastre (punto, coma, etc.)
  const words = raw.trim().replace(/[.,;:]+$/, '').split(/\s+/);
  // Elimina tokens no-nombre del final
  while (words.length > 1 && NON_NAME_TOKENS.has(words[words.length - 1].toUpperCase())) {
    words.pop();
  }
  // Normaliza: si la palabra es toda mayúsculas (>= 2 chars) → title case
  return words
    .map(w => (w.length >= 2 && w === w.toUpperCase() && /^[A-ZÁÉÍÓÚÑ]+$/.test(w))
      ? w.charAt(0) + w.slice(1).toLowerCase()
      : w)
    .join(' ');
}

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable()
export class ContractAnalyzerService {
  private readonly logger = new Logger(ContractAnalyzerService.name);

  async analizar(file?: Express.Multer.File, text?: string): Promise<ContractAnalysis> {
    let contractText = '';

    if (file) {
      contractText = await this.extractText(file);
    } else if (text?.trim()) {
      contractText = text.trim();
    } else {
      throw new BadRequestException('Se requiere un archivo o texto del contrato.');
    }

    if (contractText.length < 50) {
      throw new BadRequestException('El texto extraído es demasiado corto para analizarse.');
    }

    return this.parse(contractText);
  }

  // ── Text extraction ────────────────────────────────────────────────────────

  private detectFileType(buf: Buffer, originalname: string): 'pdf' | 'docx' | 'txt' | 'doc_old' | null {
    // Magic bytes — más confiable que MIME o extensión
    if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) return 'pdf'; // %PDF
    if (buf[0] === 0x50 && buf[1] === 0x4B && buf[2] === 0x03 && buf[3] === 0x04) return 'docx'; // PK (ZIP = .docx)
    // CFBF magic bytes: formato binario antiguo de Word (.doc), Excel (.xls), etc.
    if (buf[0] === 0xD0 && buf[1] === 0xCF && buf[2] === 0x11 && buf[3] === 0xE0) return 'doc_old';
    // Fallback por extensión
    const name = originalname.toLowerCase();
    if (name.endsWith('.txt')) return 'txt';
    if (name.endsWith('.pdf')) return 'pdf';
    if (name.endsWith('.docx')) return 'docx';
    if (name.endsWith('.doc')) return 'doc_old'; // sin magic bytes reconocibles → tratarlo como doc viejo
    // Heurística: si >80% del buffer es ASCII imprimible → texto plano
    const sample = buf.slice(0, Math.min(512, buf.length));
    const printable = [...sample].filter(b => (b >= 32 && b < 127) || b === 9 || b === 10 || b === 13).length;
    if (printable / sample.length > 0.8) return 'txt';
    return null;
  }

  private async extractText(file: Express.Multer.File): Promise<string> {
    // Límite de seguridad: rechazar archivos > 5MB antes de parsear
    if (file.buffer.length > 5 * 1024 * 1024) {
      throw new BadRequestException('El archivo supera el límite de 5 MB.');
    }

    const type = this.detectFileType(file.buffer, file.originalname);

    if (!type) {
      throw new BadRequestException('Formato no reconocido. Subí un archivo PDF, DOCX o TXT.');
    }

    if (type === 'doc_old') {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const WordExtractor = require('word-extractor') as new () => { extract: (path: string) => Promise<{ getBody: () => string }> };
      // word-extractor solo acepta rutas en disco — escribimos a un tmp file
      const os  = require('os')  as typeof import('os');
      const fs  = require('fs')  as typeof import('fs');
      const path = require('path') as typeof import('path');
      const tmp = path.join(os.tmpdir(), `contract_${Date.now()}.doc`);
      try {
        fs.writeFileSync(tmp, file.buffer);
        const extractor = new WordExtractor();
        const doc = await extractor.extract(tmp);
        return doc.getBody().slice(0, 200_000);
      } catch (err) {
        this.logger.warn(`word-extractor falló para ${file.originalname}: ${String(err)}`);
        throw new BadRequestException(
          'El archivo .doc no pudo leerse. Abrilo en Word y guardalo como .docx, o copiá el texto y usá la opción "Pegar texto".',
        );
      } finally {
        try { fs.unlinkSync(tmp); } catch { /* ignorar */ }
      }
    }

    let extracted = '';

    try {
      if (type === 'pdf') {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require('pdf-parse') as (buf: Buffer, opts?: Record<string, unknown>) => Promise<{ text: string }>;
        // max_pages limita el parseo para evitar PDF bombs
        const result = await pdfParse(file.buffer, { max: 50 });
        extracted = result.text;
      } else if (type === 'docx') {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const mammoth = require('mammoth') as { extractRawText: (o: { buffer: Buffer }) => Promise<{ value: string }> };
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        extracted = result.value;
      } else {
        // TXT: decodificar como UTF-8
        extracted = file.buffer.toString('utf-8');
      }
    } catch (err) {
      this.logger.warn(`Error extrayendo texto de ${file.originalname}: ${String(err)}`);
      throw new BadRequestException('No se pudo leer el archivo. Asegurate de que no esté dañado ni protegido con contraseña.');
    }

    // Límite de texto extraído: evitar que un PDF bomb llene la memoria
    const MAX_CHARS = 200_000;
    if (extracted.length > MAX_CHARS) {
      extracted = extracted.slice(0, MAX_CHARS);
      this.logger.warn(`Texto truncado a ${MAX_CHARS} caracteres (archivo: ${file.originalname})`);
    }

    return extracted;
  }

  // ── Main parser ────────────────────────────────────────────────────────────

  private parse(text: string): ContractAnalysis {
    const normalizedText = text.replace(/\s+/g, ' ').trim();

    const tipo    = this.detectTipo(normalizedText);
    const partes  = this.extractPartes(normalizedText);
    const bien    = this.extractBien(normalizedText, tipo);
    const plazos  = this.extractPlazos(normalizedText);
    const precio  = this.extractPrecio(normalizedText);
    const deposito = this.extractDeposito(normalizedText);
    const leyes   = this.extractLeyes(normalizedText);
    const alertas = this.generateAlertas(normalizedText, leyes, plazos, precio);

    const titulo = this.buildTitulo(tipo, partes);
    const resumen = this.buildResumen(tipo, partes, bien, plazos, precio);

    return { tipo, titulo, resumen, partes, bien, plazos, precio, deposito, leyes, alertas };
  }

  // ── Tipo ───────────────────────────────────────────────────────────────────

  private detectTipo(text: string): string {
    const upper = text.toUpperCase();
    if (/LOCACI[ÓO]N|LOCADOR|LOCATARIO|ALQUILER/.test(upper)) return 'CONTRATO_LOCACION';
    if (/CONTRATO\s+(DE\s+)?TRABAJO|EMPLEADOR|EMPLEADO|RELACI[ÓO]N\s+LABORAL/.test(upper)) return 'CONTRATO_LABORAL';
    if (/COMPRAVENTA|VENDEDOR|COMPRADOR|PRECIO\s+DE\s+VENTA/.test(upper)) return 'CONTRATO_COMPRAVENTA';
    if (/PRESTACI[ÓO]N\s+DE\s+SERVICIOS|COMITENTE|CONTRATISTA/.test(upper)) return 'CONTRATO_SERVICIOS';
    return 'OTRO';
  }

  // ── Partes ─────────────────────────────────────────────────────────────────

  /** Extrae DNI/CUIL/CUIT del contexto cercano a una posición del texto */
  private extractDocFromCtx(text: string, idx: number): ContractParte['documento'] {
    const ctx = text.slice(Math.max(0, idx - 30), Math.min(text.length, idx + 350));
    const dniM  = ctx.match(/DNI\s*[Nº°N]?\s*([\d.]{6,12})/i);
    const cuilM = ctx.match(/CUIL\s*[Nº°N]?\s*([\d.\-]{9,14})/i);
    const cuitM = ctx.match(/CUIT\s*[Nº°N]?\s*([\d.\-]{9,14})/i);
    if (dniM)  return { tipo: 'DNI',  numero: dniM[1] };
    if (cuilM) return { tipo: 'CUIL', numero: cuilM[1] };
    if (cuitM) return { tipo: 'CUIT', numero: cuitM[1] };
    return null;
  }

  /** Extrae domicilio del contexto */
  private extractDomFromCtx(text: string, idx: number): string | null {
    const ctx = text.slice(Math.max(0, idx - 30), Math.min(text.length, idx + 400));
    const m = ctx.match(/(?:domicili(?:o|ado[a]?|ada)|con\s+domicilio)\s+(?:en\s+|real\s+en\s+|constituido\s+en\s+)?([^,\n]{10,100})/i);
    return m ? m[1].trim().replace(/\s+/g, ' ') : null;
  }

  /** Extrae email del contexto */
  private extractEmailFromCtx(text: string, idx: number): string | null {
    const ctx = text.slice(Math.max(0, idx - 30), Math.min(text.length, idx + 400));
    const m = ctx.match(/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/i);
    return m ? m[1] : null;
  }

  private extractPartes(text: string): ContractParte[] {
    const partes: ContractParte[] = [];

    const ROLE_MAP: Record<string, string> = {
      LOCADOR: 'LOCADOR', LOCADORA: 'LOCADOR',
      LOCATARIO: 'LOCATARIO', LOCATARIA: 'LOCATARIO',
      GARANTE: 'GARANTE', GARANTES: 'GARANTE',
      FIADOR: 'GARANTE', FIADORA: 'GARANTE', FIADORES: 'GARANTE',
      COGARANTE: 'GARANTE', COFIADOR: 'GARANTE',
      EMPLEADOR: 'EMPLEADOR', EMPLEADORA: 'EMPLEADOR',
      EMPLEADO: 'EMPLEADO', EMPLEADA: 'EMPLEADO',
      VENDEDOR: 'VENDEDOR', VENDEDORA: 'VENDEDOR',
      COMPRADOR: 'COMPRADOR', COMPRADORA: 'COMPRADOR',
      COMITENTE: 'COMITENTE', CONTRATISTA: 'CONTRATISTA',
    };
    const ROLE_RE = `(LOCADOR[A]?|LOCATARI[AO]|GARANTES?|FIADOR[AES]?|COGARANTE|COFIADOR|EMPLEADOR[A]?|EMPLEAD[AO]|VENDEDOR[A]?|COMPRADOR[A]?|COMITENTE|CONTRATISTA)`;
    const NAME_RE = `[A-Z\xC0-\xD6\xD8-\xDE][A-Za-z\xC0-\xFF]+(?:\\s+[A-Z\xC0-\xD6\xD8-\xDE][A-Za-z\xC0-\xFF]+){1,4}`;
    const TITLE_RE = `(?:se[ñn]or[ae]?s?|sr\\.?|sra\\.?|don|do[nñ]a)`;
    // Acepta puntos (18.123.456) Y guiones (23-23337593-4) en números de documento
    const DOC_RE = `(?:DNI|CUIL|CUIT)\\s*[Nº°n]?\\.?\\s*([\\d.\\-]{6,14})`;

    const addParte = (p: ContractParte) => {
      if (!isValidPersonName(p.nombre)) return;
      // Dedup: mismo nombre+rol O mismo número de documento+rol
      const exists = partes.find(x =>
        x.rol === p.rol && (
          x.nombre.toLowerCase() === p.nombre.toLowerCase() ||
          (x.documento?.numero && p.documento?.numero && x.documento.numero === p.documento.numero)
        )
      );
      if (!exists) partes.push(p);
    };

    let m: RegExpExecArray | null;

    // ── Estrategia principal: anclar en DOCUMENTO (DNI/CUIL/CUIT) ──────────────
    // En contratos argentinos el nombre SIEMPRE precede al número de documento.
    // Buscamos solo en `before` para evitar contaminación cruzada entre personas.
    // De todos los candidatos válidos, tomamos el ÚLTIMO (más cercano al DNI).
    const docRe = new RegExp(DOC_RE, 'gi');
    while ((m = docRe.exec(text)) !== null) {
      const rawDocNum = m[1];
      // Elimina puntos o guiones de arrastre del número de documento
      const docNum  = rawDocNum.replace(/[.\-]+$/, '');
      const docTipo = m[0].match(/^(DNI|CUIL|CUIT)/i)?.[0]?.toUpperCase() ?? 'DNI';
      const dniPos  = m.index;

      // CUITs de personas jurídicas (prefijo 30, 33, 34) — no son personas físicas
      if ((docTipo === 'CUIT' || docTipo === 'CUIL') && /^3[034]/.test(docNum.replace(/[.\-]/g, ''))) continue;

      // Ventana ANTES del documento: 400 chars — nombre siempre precede al DNI
      const before = text.slice(Math.max(0, dniPos - 400), dniPos);
      // Ventana DESPUÉS: 400 chars para rol (LOCADOR puede aparecer lejos del DNI)
      const after  = text.slice(dniPos + m[0].length, Math.min(text.length, dniPos + m[0].length + 400));

      // Recopila todos los candidatos de nombre en `before` con su posición
      const candidates: Array<{ name: string; index: number }> = [];
      let nm: RegExpExecArray | null;

      // Con título de cortesía (más confiable)
      const nameWithTitle = new RegExp(`${TITLE_RE}\\s+(${NAME_RE})`, 'gi');
      while ((nm = nameWithTitle.exec(before)) !== null) {
        const candidate = cleanAndNormalizeName(nm[1]);
        if (isValidPersonName(candidate)) candidates.push({ name: candidate, index: nm.index });
      }

      // Sin título: cualquier secuencia capitalizada válida
      const nameRe = new RegExp(NAME_RE, 'g');
      while ((nm = nameRe.exec(before)) !== null) {
        const candidate = cleanAndNormalizeName(nm[0]);
        if (isValidPersonName(candidate)) candidates.push({ name: candidate, index: nm.index });
      }

      if (candidates.length === 0) continue;

      // Último candidato = mayor índice = más cercano al DNI
      candidates.sort((a, b) => b.index - a.index);
      const nombre = candidates[0].name;

      // Rol: buscar en ventana amplia antes y después del documento
      const roleWindow = before.slice(-400) + ' [DOC] ' + after;
      const rolCenter  = Math.min(before.length, 400);
      const roleRe = new RegExp(ROLE_RE, 'gi');
      let rol: string | null = null;
      let rolDist = Infinity;
      let rm: RegExpExecArray | null;
      while ((rm = roleRe.exec(roleWindow)) !== null) {
        const dist = Math.abs(rm.index - rolCenter);
        if (dist < rolDist) { rolDist = dist; rol = ROLE_MAP[rm[1].toUpperCase()] ?? rm[1].toUpperCase(); }
      }
      rol = rol ?? 'PARTE';

      // Si el contexto menciona convivir, la persona es CONVIVIENTE
      // (independientemente de lo que diga el rol detectado)
      const convCtx = before.slice(-300) + ' ' + after.slice(0, 150);
      if (/convivir[aá]?|conviviente/i.test(convCtx)) rol = 'CONVIVIENTE';

      addParte({
        rol, nombre,
        documento: { tipo: docTipo as 'DNI' | 'CUIL' | 'CUIT', numero: docNum },
        domicilio: this.extractDomFromCtx(text, dniPos),
        email:     this.extractEmailFromCtx(text, dniPos),
        nota: null,
      });
    }

    // ── Fallback: personas sin DNI mencionado pero con rol explícito ────────────
    if (partes.filter(p => ['GARANTE', 'LOCADOR', 'LOCATARIO'].includes(p.rol)).length < 2) {
      const shortPatA = new RegExp(`${TITLE_RE}\\s+(${NAME_RE})[^.;]{0,120}?${ROLE_RE}`, 'gi');
      while ((m = shortPatA.exec(text)) !== null) {
        const nombre = cleanAndNormalizeName(m[1]);
        const rol = ROLE_MAP[m[2].toUpperCase()] ?? m[2].toUpperCase();
        addParte({ rol, nombre, documento: null, domicilio: this.extractDomFromCtx(text, m.index), email: this.extractEmailFromCtx(text, m.index), nota: null });
      }

      const shortPatB = new RegExp(`${ROLE_RE}[:\\s,]{1,5}${TITLE_RE}\\s+(${NAME_RE})`, 'gi');
      while ((m = shortPatB.exec(text)) !== null) {
        const rol    = ROLE_MAP[m[1].toUpperCase()] ?? m[1].toUpperCase();
        const nombre = cleanAndNormalizeName(m[2]);
        addParte({ rol, nombre, documento: null, domicilio: this.extractDomFromCtx(text, m.index), email: this.extractEmailFromCtx(text, m.index), nota: null });
      }
    }

    // ── Convivientes ────────────────────────────────────────────────────────────
    const convRe = new RegExp(
      `(?:convivir[aá]|habitar[aá]|junto\\s+(?:a|con))[^.]{0,150}?(${NAME_RE})\\s+(?:DNI|CUIL)\\s*[Nº°]?\\s*([\\d.\\-]{6,12})`,
      'gi',
    );
    while ((m = convRe.exec(text)) !== null) {
      const nombre = cleanAndNormalizeName(m[1]);
      addParte({ rol: 'CONVIVIENTE', nombre, documento: { tipo: 'DNI', numero: m[2] }, domicilio: null, email: null, nota: null });
    }

    return partes;
  }

  // ── Bien ───────────────────────────────────────────────────────────────────

  private extractBien(text: string, tipo: string): ContractAnalysis['bien'] {
    if (tipo === 'CONTRATO_LOCACION') {
      // Busca "da en locación ... ubicado en DIRECCIÓN"
      const addrMatch = text.match(/ubicad[ao]\s+en\s+(?:la\s+)?(?:calle\s+)?([^,]{5,80}(?:,\s*[^,]{3,40})?)/i);
      // Busca descripción del inmueble
      const descMatch = text.match(/(?:compuest[ao]\s+(?:principalmente\s+)?de|compuest[ao]\s+por)\s*([^.]{20,300})/i);

      let direccion: string | null = null;
      if (addrMatch) {
        direccion = addrMatch[1].trim().replace(/\s+/g, ' ');
      }

      const descripcion = descMatch
        ? descMatch[1].trim().replace(/\s+/g, ' ').slice(0, 200)
        : 'Inmueble destinado a vivienda';

      return { tipo: 'INMUEBLE', descripcion, direccion };
    }

    return null;
  }

  // ── Plazos ─────────────────────────────────────────────────────────────────

  private extractPlazos(text: string): ContractAnalysis['plazos'] {
    // Busca "TREINTA Y SEIS (36) meses"
    const durMatch = text.match(/(\w[\w\s]+)\s*\((\d+)\)\s*meses/i);
    const duracionMeses = durMatch ? parseInt(durMatch[2], 10) : null;

    // Busca fechas textuales "01 de Febrero de 2022"
    const datePattern = /(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+de\s+(\d{4})/gi;
    const dates: string[] = [];
    let m: RegExpExecArray | null;
    const dp = new RegExp(datePattern.source, 'gi');
    while ((m = dp.exec(text)) !== null) {
      const day   = m[1].padStart(2, '0');
      const month = MONTH_MAP[m[2].toLowerCase()];
      const year  = m[3];
      dates.push(`${year}-${month}-${day}`);
    }

    // Busca fechas numéricas DD/MM/YYYY
    const numDatePattern = /(\d{2})\/(\d{2})\/(\d{4})/g;
    while ((m = numDatePattern.exec(text)) !== null) {
      dates.push(`${m[3]}-${m[2]}-${m[1]}`);
    }

    const inicio = dates[0] ?? null;
    const fin    = dates.length > 1 ? dates[dates.length - 1] : null;

    // Determina estado en base a fecha fin
    let estado = 'INDETERMINADO';
    if (fin) {
      const finDate = new Date(fin);
      estado = finDate < new Date() ? 'VENCIDO' : 'VIGENTE';
    }

    if (!inicio && !fin && !duracionMeses) return null;
    return { inicio, fin, duracionMeses, estado };
  }

  // ── Precio ─────────────────────────────────────────────────────────────────

  private extractPrecio(text: string): ContractAnalysis['precio'] {
    // Busca "PESOS VEINTI SIETE MIL ($ 27000)" o "$ 27.000" o "$27000"
    const montoMatch =
      text.match(/\$\s*([\d.,]+)/i) ??
      text.match(/pesos[\w\s]+\(\s*\$\s*([\d.,]+)\s*\)/i);

    const montoStr = montoMatch?.[1].replace(/\./g, '').replace(',', '.') ?? null;
    const montoInicial = montoStr ? parseFloat(montoStr) : null;

    // Moneda
    const moneda = /USD|dólares|dolares/i.test(text) ? 'USD' : 'ARS';

    // Periodicidad
    const periodicidad = /mensual|por\s+mes|cada\s+mes/i.test(text) ? 'MENSUAL' : 'OTRA';

    // Mecanismo de actualización con referencia legal
    let actualizacion: string | null = null;
    let actualizacionRef: ContractRef | null = null;

    if (/ICL/i.test(text)) {
      actualizacion = 'ICL (Índice de Contratos de Locación — Banco Central)';
      actualizacionRef = { texto: 'Ley 27.551 art. 14 (DEROGADO dic. 2023)', url: null };
    } else if (/IPC.*RIPTE|RIPTE.*IPC/i.test(text)) {
      actualizacion = 'Promedio IPC + RIPTE (Ley 27.551 art. 14)';
      actualizacionRef = { texto: 'Ley 27.551 art. 14 (DEROGADO dic. 2023)', url: null };
    } else if (/IPC/i.test(text)) {
      actualizacion = 'IPC (Índice de Precios al Consumidor)';
      actualizacionRef = { texto: 'Acuerdo entre partes (Ley 27.737)', url: null };
    } else if (/RIPTE/i.test(text)) {
      actualizacion = 'RIPTE (Remuneración Imponible Promedio de Trabajadores Estables)';
      actualizacionRef = { texto: 'Acuerdo entre partes (Ley 27.737)', url: null };
    } else if (/UVA/i.test(text)) {
      actualizacion = 'UVA (Unidad de Valor Adquisitivo)';
      actualizacionRef = { texto: 'Acuerdo entre partes', url: null };
    }

    // Vencimiento de pago
    let vencimientoPago: string | null = null;
    const vpMatch = text.match(/(?:entre|del)\s+(?:el\s+)?(?:d[íi]a\s+)?(\d)\s+y\s+(?:el\s+)?(?:d[íi]a\s+)?(\d)\s+de\s+cada\s+mes/i);
    if (vpMatch) vencimientoPago = `Del ${vpMatch[1]} al ${vpMatch[2]} de cada mes`;

    if (!montoInicial) return null;
    return { montoInicial, moneda, periodicidad, actualizacion, actualizacionRef, vencimientoPago };
  }

  // ── Depósito ───────────────────────────────────────────────────────────────

  private extractDeposito(text: string): ContractAnalysis['deposito'] {
    const depSection = text.match(/dep[óo]sito[^.]{0,500}/i)?.[0] ?? '';
    const montoMatch =
      depSection.match(/\$\s*([\d.,]+)/i) ??
      depSection.match(/pesos[\w\s]+\(\s*\$\s*([\d.,]+)\s*\)/i);

    const montoStr = montoMatch?.[1].replace(/\./g, '').replace(',', '.') ?? null;
    const monto = montoStr ? parseFloat(montoStr) : null;

    const condMatch = depSection.match(/(?:devolver[aá]|restituir[aá]|retener)[^.]{10,200}/i);
    const condiciones = condMatch ? condMatch[0].trim() : null;

    if (!monto) return null;
    return { monto, condiciones };
  }

  // ── Leyes ──────────────────────────────────────────────────────────────────

  private extractLeyes(text: string): ContractLey[] {
    const found = new Map<string, { articulos: Set<string>; usos: string[] }>();

    // Ley N° XXXXX o Ley XXXXX
    const lawPattern = /[Ll]ey\s+(?:N[°º]?\s*)?([\d]{4,5}(?:[\.,]\d+)?)/g;
    let m: RegExpExecArray | null;
    while ((m = lawPattern.exec(text)) !== null) {
      const num = m[1].replace(/[.,]/g, '');
      if (!found.has(num)) found.set(num, { articulos: new Set(), usos: [] });
      // Busca artículo siguiente
      const after = text.slice(m.index + m[0].length, m.index + m[0].length + 60);
      const artM = after.match(/art[íi]culo[s]?\s*\.?\s*(\d+(?:\s*(?:y|,)\s*\d+)*)/i);
      if (artM) artM[1].split(/[,y]/i).forEach(a => found.get(num)!.articulos.add(a.trim()));
      // Uso contextual
      const ctx = text.slice(Math.max(0, m.index - 40), m.index + 100);
      found.get(num)!.usos.push(ctx.replace(/\s+/g, ' ').trim());
    }

    // CCyC / Código Civil y Comercial → mapea a Ley 26.994
    if (/C[Óó]digo\s+Civil\s+y\s+Comercial|CCyC/i.test(text)) {
      if (!found.has('26994')) found.set('26994', { articulos: new Set(), usos: [] });
      // "art. N del Código Civil y Comercial"
      const ccycArtPattern = /(?:art[íi]culo|art\.)\s*\.?\s*(\d+)\s+(?:del\s+)?(?:C[óo]digo\s+Civil\s+y\s+Comercial|CCyC)/gi;
      while ((m = ccycArtPattern.exec(text)) !== null) {
        found.get('26994')!.articulos.add(m[1]);
      }
      // "CCyC art. N" o "CCyC, art. N"
      const ccycArtPattern2 = /CCyC[,\s]+art[íi]culo?\s*\.?\s*(\d+)/gi;
      while ((m = ccycArtPattern2.exec(text)) !== null) {
        found.get('26994')!.articulos.add(m[1]);
      }
      // "arts. 1209, 1190, 1225" cerca de CCyC
      const ccycMultiArt = /(?:arts?)\.\s*((?:\d{4,5}(?:\s*[,y]\s*)?)+)/gi;
      while ((m = ccycMultiArt.exec(text)) !== null) {
        const nums = m[1].split(/[,y\s]+/).map(s => s.trim()).filter(s => /^\d{4,5}$/.test(s));
        for (const n of nums) found.get('26994')!.articulos.add(n);
      }
    }

    // Construye resultado
    const result: ContractLey[] = [];
    for (const [num, { articulos, usos }] of found.entries()) {
      const entry = LAW_DB[num];
      const artList = [...articulos].sort((a, b) => parseInt(a) - parseInt(b));

      let estado: ContractLey['estado'] = entry?.estado ?? 'VIGENTE';
      let nota: string | null = entry?.nota ?? null;

      // Construye detalle por artículo con URL
      const articulosDetalle: ContractArticulo[] = artList.map(art => {
        const artEntry = entry?.articles?.[art];
        const url = entry?.articleUrlBase ? `${entry.articleUrlBase}${art}` : null;

        if (artEntry?.estado === 'DEROGADA') {
          estado = 'MODIFICADA';
          nota = (nota ? nota + ' ' : '') + `Art. ${art}: ${artEntry.nota}`;
        }

        return {
          numero: art,
          estado: artEntry?.estado ?? null,
          nota: artEntry?.nota ?? null,
          url,
        };
      });

      // Si no se extrajeron artículos específicos pero la ley tiene URL, la URL base sigue siendo útil
      const urlObservatorio = entry?.urlObservatorio ?? null;

      result.push({
        nombre: entry?.nombre ?? `Ley ${num}`,
        numero: num,
        articulos: artList,
        articulosDetalle,
        uso: usos[0]?.slice(0, 120) ?? '',
        estado,
        nota,
        urlObservatorio,
      });
    }

    return result;
  }

  // ── Alertas ────────────────────────────────────────────────────────────────

  private generateAlertas(
    text: string,
    leyes: ContractLey[],
    plazos: ContractAnalysis['plazos'],
    precio: ContractAnalysis['precio'],
  ): ContractAlerta[] {
    const alertas: ContractAlerta[] = [];

    // Ley 27.551 art. 14 derogada (detectada en la sección de leyes)
    const ley27551 = leyes.find(l => l.numero === '27551');
    if (ley27551 && ley27551.articulos.includes('14')) {
      alertas.push({
        severidad: 'ERROR',
        titulo: 'Índice de actualización derogado (Ley 27.551 art. 14)',
        descripcion: 'El artículo 14 de la Ley 27.551 que establece el ICL como índice de actualización fue derogado por la Ley 27.737 en diciembre de 2023. Los contratos firmados antes pueden haber quedado sin mecanismo legal de actualización en el tramo posterior a esa fecha.',
        clausula: 'TERCERA (PRECIO)',
        referencias: [
          { texto: 'Ley 27.551 art. 14 (DEROGADO)', url: null },
          { texto: 'Ley 27.737 (reforma dic. 2023)', url: null },
        ],
      });
    }

    // IPC+RIPTE referenciado en el texto (aunque no aparezca como "Ley 27551")
    if (/IPC.*RIPTE|RIPTE.*IPC/i.test(text) && !alertas.find(a => a.titulo.includes('27.551'))) {
      alertas.push({
        severidad: 'ADVERTENCIA',
        titulo: 'Mecanismo de actualización IPC+RIPTE (Ley 27.551)',
        descripcion: 'El contrato usa el índice IPC+RIPTE de la Ley 27.551 art. 14, que fue derogado en diciembre 2023. Verificar si el mecanismo de actualización sigue siendo aplicable para el período posterior a esa fecha.',
        clausula: null,
        referencias: [
          { texto: 'Ley 27.551 art. 14 (DEROGADO)', url: null },
          { texto: 'Ley 27.737 (reforma dic. 2023)', url: null },
        ],
      });
    }

    // Interés punitorio abusivo (> 10% mensual)
    const interesMatch = text.match(/([\d,.]+)%\s*(?:diario|mensual)/i);
    if (interesMatch) {
      const pct = parseFloat(interesMatch[1].replace(',', '.'));
      const isDaily = /diario/i.test(interesMatch[0]);
      const monthly = isDaily ? pct * 30 : pct;
      if (monthly > 10) {
        alertas.push({
          severidad: 'ADVERTENCIA',
          titulo: `Interés punitorio posiblemente abusivo (${interesMatch[0].trim()})`,
          descripcion: `Equivale a ~${monthly.toFixed(0)}% mensual. Los tribunales argentinos pueden reducir intereses desproporcionados por considerarlos abusivos, aunque hayan sido pactados voluntariamente.`,
          clausula: 'QUINTA (DEMORA)',
          referencias: [
            { texto: 'CCyC art. 771 — facultad judicial de reducir intereses', url: '/codigos/civil-comercial/articulo/771' },
            { texto: 'CCyC art. 279 — acto jurídico contrario a la moral', url: '/codigos/civil-comercial/articulo/279' },
          ],
        });
      }
    }

    // Contrato vencido
    if (plazos?.estado === 'VENCIDO' && plazos.fin) {
      alertas.push({
        severidad: 'INFO',
        titulo: 'Contrato vencido',
        descripcion: `El contrato venció el ${plazos.fin.split('-').reverse().join('/')}. Si las partes siguen con la relación contractual sin haber firmado renovación, puede aplicar la continuación tácita según el CCyC.`,
        clausula: 'SEGUNDA (PLAZO)',
        referencias: [
          { texto: 'CCyC art. 1218 — continuación de la locación', url: '/codigos/civil-comercial/articulo/1218' },
        ],
      });
    }

    // Multa por ocupación ilegítima
    if (/triple|tres\s+veces/i.test(text) && /alquiler|locaci[oó]n/i.test(text)) {
      alertas.push({
        severidad: 'INFO',
        titulo: 'Cláusula de multa por ocupación ilegítima',
        descripcion: 'El contrato incluye una multa equivalente al triple del alquiler por ocupación ilegítima post-vencimiento. Esta cláusula es válida pero su ejecutabilidad puede discutirse judicialmente.',
        clausula: 'CUARTA',
        referencias: [
          { texto: 'CCyC art. 1222 — intimación de pago y restitución', url: '/codigos/civil-comercial/articulo/1222' },
        ],
      });
    }

    // Prohibición de animales
    if (/animales/i.test(text) && /prohibid[ao]/i.test(text)) {
      alertas.push({
        severidad: 'INFO',
        titulo: 'Prohibición de animales',
        descripcion: 'El contrato prohíbe tener animales. En algunos municipios y jurisdicciones esta cláusula puede colisionar con ordenanzas locales de tenencia responsable.',
        clausula: 'SÉPTIMA',
        referencias: [],
      });
    }

    // Depósito en cuotas
    if (/dos\s+cuotas|primera\s+cuota|segunda\s+cuota/i.test(text)) {
      alertas.push({
        severidad: 'INFO',
        titulo: 'Depósito en garantía en cuotas',
        descripcion: 'El depósito se paga en dos cuotas. Según la Ley 27.551, el depósito máximo es de 1 mes de alquiler y debe devolverse al valor del último mes.',
        clausula: 'DECIMAPRIMERA (GARANTÍAS)',
        referencias: [
          { texto: 'Ley 27.551 art. 7 — depósito máximo 1 mes', url: null },
          { texto: 'CCyC art. 1196 — depósito en garantía', url: '/codigos/civil-comercial/articulo/1196' },
        ],
      });
    }

    return alertas;
  }

  // ── Título y resumen ───────────────────────────────────────────────────────

  private buildTitulo(tipo: string, partes: ContractParte[]): string {
    const labels: Record<string, string> = {
      CONTRATO_LOCACION: 'Contrato de locación',
      CONTRATO_LABORAL: 'Contrato laboral',
      CONTRATO_COMPRAVENTA: 'Contrato de compraventa',
      CONTRATO_SERVICIOS: 'Contrato de servicios',
      OTRO: 'Contrato',
    };
    const base = labels[tipo] ?? 'Contrato';
    // Toma solo partes con roles principales (no garantes ni convivientes para el título)
    const principal1 = partes.find(p => ['LOCADOR', 'VENDEDOR', 'EMPLEADOR', 'COMITENTE'].includes(p.rol));
    const principal2 = partes.find(p => ['LOCATARIO', 'COMPRADOR', 'EMPLEADO', 'CONTRATISTA'].includes(p.rol));
    if (principal1 && principal2) return `${base} — ${principal1.nombre} / ${principal2.nombre}`;
    if (principal1) return `${base} — ${principal1.nombre}`;
    if (principal2) return `${base} — ${principal2.nombre}`;
    return base;
  }

  private buildResumen(
    tipo: string,
    partes: ContractParte[],
    bien: ContractAnalysis['bien'],
    plazos: ContractAnalysis['plazos'],
    precio: ContractAnalysis['precio'],
  ): string {
    const parts: string[] = [];

    if (tipo === 'CONTRATO_LOCACION') {
      const locador   = partes.find(p => p.rol === 'LOCADOR');
      const locatario = partes.find(p => p.rol === 'LOCATARIO');
      const garantes  = partes.filter(p => p.rol === 'GARANTE');
      if (locador && locatario) {
        parts.push(`${locador.nombre} (locador) alquila a ${locatario.nombre} (locatario).`);
      } else if (locador) {
        parts.push(`Locador: ${locador.nombre}.`);
      } else if (locatario) {
        parts.push(`Locatario: ${locatario.nombre}.`);
      }
      if (garantes.length > 0) parts.push(`Garante${garantes.length > 1 ? 's' : ''}: ${garantes.map(g => g.nombre).join(', ')}.`);
      if (bien?.direccion) parts.push(`Inmueble: ${bien.direccion}.`);
    } else if (tipo === 'CONTRATO_LABORAL') {
      const empleador = partes.find(p => p.rol === 'EMPLEADOR');
      const empleado  = partes.find(p => p.rol === 'EMPLEADO');
      if (empleador && empleado) parts.push(`${empleador.nombre} contrata a ${empleado.nombre}.`);
    } else if (tipo === 'CONTRATO_COMPRAVENTA') {
      const vendedor  = partes.find(p => p.rol === 'VENDEDOR');
      const comprador = partes.find(p => p.rol === 'COMPRADOR');
      if (vendedor && comprador) parts.push(`${vendedor.nombre} vende a ${comprador.nombre}.`);
      if (bien?.direccion) parts.push(`Inmueble: ${bien.direccion}.`);
    }

    if (plazos?.inicio && plazos.fin) {
      const ini = plazos.inicio.split('-').reverse().join('/');
      const fin = plazos.fin.split('-').reverse().join('/');
      const dur = plazos.duracionMeses ? ` (${plazos.duracionMeses} meses)` : '';
      parts.push(`Plazo${dur}: ${ini} al ${fin}, actualmente ${plazos.estado === 'VENCIDO' ? 'vencido' : 'vigente'}.`);
    }

    if (precio?.montoInicial) {
      const fmt = new Intl.NumberFormat('es-AR').format(precio.montoInicial);
      parts.push(`Precio inicial: $${fmt}${precio.periodicidad === 'MENSUAL' ? '/mes' : ''}.`);
    }

    return parts.join(' ') || 'Contrato detectado. Revisá los datos extraídos.';
  }
}
