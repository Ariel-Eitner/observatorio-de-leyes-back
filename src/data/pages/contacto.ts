import type { LegalPage } from '../../common/types/legal-page.types';

export const CONTACTO: LegalPage = {
  slug: 'contacto',
  title: 'Contacto',
  lastUpdated: '2026-05-06',
  sections: [
    {
      id: 'general',
      title: 'Consultas generales',
      content:
        'Para consultas sobre el servicio, errores en el contenido o sugerencias, usá el formulario de contacto disponible al pie de cualquier página del sitio. Respondemos dentro de los 5 días hábiles.',
    },
    {
      id: 'privacidad',
      title: 'Privacidad y datos personales',
      content:
        'Para ejercer tus derechos de acceso, rectificación, cancelación u oposición sobre tus datos personales (art. 14 Ley 25.326), completá el formulario de contacto seleccionando el motivo "Privacidad y datos personales" e indicando tu nombre, correo y el derecho que querés ejercer. Respondemos dentro de los 30 días hábiles según lo establece la ley.',
    },
    {
      id: 'contenido',
      title: 'Errores o actualizaciones en el contenido legal',
      content:
        'Si encontrás un error en un texto legal, una norma desactualizada o una explicación que considerás imprecisa, usá el formulario de contacto seleccionando el motivo "Error o actualización en contenido" e indicá el nombre de la ley, el número de artículo y el problema detectado. Este tipo de reporte nos ayuda a mantener la plataforma rigurosa y actualizada.',
    },
    {
      id: 'prensa',
      title: 'Prensa y colaboraciones',
      content:
        'Para consultas de prensa, propuestas de colaboración institucional o académica, completá el formulario de contacto seleccionando el motivo "Prensa y colaboraciones".',
    },
  ],
};
