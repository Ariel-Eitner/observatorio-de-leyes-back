import type { LegalPage } from '../../common/types/legal-page.types';

export const AVISO_LEGAL: LegalPage = {
  slug: 'aviso-legal',
  title: 'Aviso Legal',
  lastUpdated: '2026-05-06',
  sections: [
    {
      id: 'titular',
      title: 'Titular del servicio',
      content:
        'Observatorio de Leyes es un servicio digital de acceso a legislación argentina operado en la República Argentina. Para consultas sobre el servicio, podés comunicarte con nosotros a través del formulario de contacto disponible en el sitio.',
    },
    {
      id: 'naturaleza',
      title: 'Naturaleza informativa',
      content:
        'El contenido de esta plataforma —incluyendo los textos legales oficiales, sus explicaciones en lenguaje claro, resúmenes y análisis— tiene carácter exclusivamente informativo y educativo. No constituye asesoramiento jurídico, no establece una relación abogado-cliente y no debe utilizarse como fundamento exclusivo para tomar decisiones con consecuencias legales. Ante cualquier situación que requiera orientación jurídica, el usuario debe consultar a un abogado matriculado en la jurisdicción correspondiente.',
    },
    {
      id: 'textos-oficiales',
      title: 'Textos oficiales y exactitud',
      content:
        'Los textos legales que publica esta plataforma provienen de fuentes oficiales (InfoLEG, Argentina.gob.ar y Boletín Oficial). Procuramos que estén actualizados, pero la legislación se modifica con frecuencia. Para cualquier trámite, proceso judicial o decisión de relevancia jurídica, el usuario debe verificar la versión oficial vigente en el Boletín Oficial de la República Argentina. No nos responsabilizamos por discrepancias entre el contenido publicado y la norma vigente.',
    },
    {
      id: 'propiedad-intelectual',
      title: 'Propiedad intelectual',
      content:
        'Los textos legales son de dominio público. El contenido original de la plataforma —explicaciones, resúmenes, estructuras de navegación, diseño y código— está protegido por la Ley de Propiedad Intelectual (Ley 11.723). Queda prohibida su reproducción total o parcial, redistribución o uso comercial sin autorización expresa. Se permite la cita parcial con fines académicos, periodísticos o educativos siempre que se mencione la fuente.',
    },
    {
      id: 'libertad-expresion',
      title: 'Libertad de expresión e internet',
      content:
        'Esta plataforma ejerce su actividad al amparo de la garantía constitucional de libertad de expresión (arts. 1, 14, 32 CN) y de la Ley de Libertad de Expresión en Internet (Ley 26.032), que establece que la búsqueda, recepción y difusión de información e ideas por medio de internet se considera comprendida dentro de la garantía constitucional que ampara la libertad de expresión.',
    },
    {
      id: 'links',
      title: 'Vínculos externos',
      content:
        'La plataforma puede incluir enlaces a sitios oficiales del Estado argentino (InfoLEG, Argentina.gob.ar, Boletín Oficial) y a otras fuentes jurídicas de referencia. No somos responsables por el contenido ni la disponibilidad de esos sitios externos.',
    },
  ],
};
