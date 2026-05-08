import type { LegalPage } from '../../common/types/legal-page.types';

export const PRIVACIDAD: LegalPage = {
  slug: 'privacidad',
  title: 'Política de Privacidad',
  lastUpdated: '2026-05-06',
  sections: [
    {
      id: 'introduccion',
      title: 'Introducción',
      content:
        'Esta Política de Privacidad describe cómo Observatorio de Leyes recopila, usa y protege la información de sus usuarios. El tratamiento de datos personales se realiza en cumplimiento de la Ley de Protección de Datos Personales (arts. 1, 4 Ley 25.326) y la Disposición DNPDP 7/2005. La base de datos de usuarios está registrada ante la Dirección Nacional de Protección de Datos Personales (DNPDP).',
    },
    {
      id: 'que-recopilamos',
      title: '¿Qué información recopilamos?',
      content:
        'Para visitantes sin cuenta (guests): una cookie de sesión anónima de primera parte (httpOnly, no compartida con terceros), el tipo de dispositivo, la provincia o país de acceso aproximados por geolocalización de IP, y eventos de uso como páginas visitadas, búsquedas realizadas, artículos leídos y tiempo de sesión. Para usuarios registrados: adicionalmente, la dirección de correo electrónico y el historial de uso vinculado a la cuenta. No recopilamos datos sensibles, datos de salud, información financiera ni documentos de identidad.',
    },
    {
      id: 'para-que',
      title: '¿Para qué usamos tus datos?',
      content:
        'Los datos se usan para: brindar y mejorar el servicio, personalizar la experiencia de uso, generar estadísticas agregadas y anónimas sobre el uso de la plataforma, prevenir el abuso del servicio y, en el caso de usuarios registrados, gestionar la cuenta y las comunicaciones relacionadas con el servicio. No usamos los datos para publicidad de terceros ni los cedemos a empresas de marketing.',
    },
    {
      id: 'cookies',
      title: 'Cookies',
      content:
        'Usamos una cookie de sesión propia (first-party) para identificar al visitante de forma anónima entre visitas. Esta cookie no contiene datos personales identificables, no puede ser leída por terceros y se puede eliminar desde el navegador en cualquier momento. No utilizamos cookies de publicidad ni de redes sociales. Podemos usar cookies técnicas para el funcionamiento del sistema de autenticación.',
    },
    {
      id: 'compartir',
      title: '¿Con quién compartimos tus datos?',
      content:
        'No vendemos ni cedemos datos personales a terceros. Podemos compartir información con proveedores de servicios técnicos (hosting, infraestructura) únicamente en la medida necesaria para operar el servicio, bajo acuerdos de confidencialidad. En caso de requerimiento judicial o administrativo legítimo, proporcionaremos la información que la ley exija (art. 11 Ley 25.326).',
    },
    {
      id: 'derechos',
      title: 'Tus derechos (ARCO)',
      content:
        'Conforme a la Ley de Protección de Datos Personales, el titular de los datos tiene derecho de acceso, rectificación, cancelación y oposición (art. 14 Ley 25.326) en forma gratuita. Para ejercer cualquiera de estos derechos, usá el formulario de contacto seleccionando el motivo "Privacidad y datos personales" e indicá tu nombre, correo y el derecho que querés ejercer. Respondemos dentro de los 30 días hábiles según lo establece la ley (art. 16 Ley 25.326).',
    },
    {
      id: 'retencion',
      title: 'Retención de datos',
      content:
        'Los datos de visitantes anónimos se retienen por un máximo de 2 años o hasta que el usuario solicite su eliminación. Los datos de usuarios registrados se conservan mientras la cuenta esté activa y durante el plazo mínimo que exijan las obligaciones legales aplicables. Al eliminar la cuenta, se anonomizan los datos dentro de los 30 días posteriores a la solicitud.',
    },
    {
      id: 'cambios',
      title: 'Cambios a esta política',
      content:
        'Podemos actualizar esta política cuando sea necesario. Los cambios relevantes serán comunicados a los usuarios registrados a través del sitio. La fecha de última actualización figura al inicio de este documento.',
    },
  ],
};
