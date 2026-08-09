import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';

/** Marcador que queda en los campos de texto obligatorios que no se pueden vaciar. */
const ANONIMO = '(cuenta borrada a pedido del titular)';

/** Techo de eventos incluidos en la exportación (los más recientes). */
const MAX_EVENTOS_EXPORT = 5000;

@Injectable()
export class AccountDataService {
  constructor(private readonly prisma: PrismaService) {}

  private sha256(valor: string): string {
    return createHash('sha256').update(valor).digest('hex');
  }

  // ── Derecho de acceso: copia de los datos ────────────────────────────────────

  /**
   * Devuelve TODO lo que la base tiene sobre esta persona, en un solo JSON.
   *
   * Es el derecho de acceso del art. 14 de la Ley 25.326. Incluye a propósito lo
   * que la persona no ve en la interfaz —el registro en el CRM, los eventos de
   * navegación, las sesiones abiertas con su IP— porque el derecho es sobre todo
   * el tratamiento, no sobre la parte cómoda de mostrar.
   *
   * Se cruza por `user_id` y también por email y `guest_id`: buena parte de la
   * huella de una persona es anterior a su registro (visitó, dejó un contacto,
   * donó) y se le atribuye por esos dos campos.
   */
  async exportar(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const email = user.email;
    const guestId = user.guestId;

    const [saved, folders, claims, sessions, solicitudes] = await Promise.all([
      this.prisma.savedLaw.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { normId: true, nota: true, folderId: true, createdAt: true },
      }),
      this.prisma.folder.findMany({
        where: { userId },
        orderBy: { ord: 'asc' },
        select: { id: true, name: true, ord: true, createdAt: true },
      }),
      this.prisma.benefitClaim.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.session.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        // tokenHash queda afuera a propósito: es una credencial, no un dato del titular.
        select: {
          createdAt: true,
          expiresAt: true,
          lastUsedAt: true,
          revokedAt: true,
          ip: true,
          userAgent: true,
          device: true,
        },
      }),
      this.prisma.accountRequest.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          type: true,
          status: true,
          contacto: true,
          notaAdmin: true,
          detalle: true,
          createdAt: true,
          resolvedAt: true,
        },
      }),
    ]);

    // Huella anterior al registro: se cruza por email y por el guest anónimo.
    const [lead, founder, pagos, contactos, pedidos, eventos, journey] = await Promise.all([
      this.prisma.leads.findFirst({ where: { email } }),
      this.prisma.founders.findFirst({ where: { email } }),
      this.prisma.pago.findMany({
        where: guestId ? { OR: [{ email }, { guestId }] } : { email },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contact_submissions.findMany({
        where: guestId ? { OR: [{ email }, { guest_id: guestId }] } : { email },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.productOrder.findMany({
        where: guestId ? { OR: [{ email }, { guestId }] } : { email },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.trackingEvent.findMany({
        where: guestId ? { OR: [{ userId }, { guestId }] } : { userId },
        orderBy: { createdAt: 'desc' },
        take: MAX_EVENTOS_EXPORT,
        select: { type: true, createdAt: true, properties: true, sessionId: true },
      }),
      guestId ? this.prisma.userJourney.findUnique({ where: { guestId } }) : Promise.resolve(null),
    ]);

    const leadEvents = lead
      ? await this.prisma.lead_events.findMany({
          where: { lead_id: lead.id },
          orderBy: { created_at: 'desc' },
        })
      : [];

    // El hash de la contraseña nunca sale, ni siquiera en la exportación propia.
    const { passwordHash: _omitido, ...perfil } = user;

    return {
      _meta: {
        generadoEl: new Date().toISOString(),
        titular: email,
        descripcion:
          'Copia de los datos personales que el Observatorio de Leyes tiene sobre vos, en ejercicio del derecho de acceso (art. 14, Ley 25.326).',
        aclaraciones: [
          'No se incluye la contraseña: se guarda cifrada con argon2id y es irreversible por diseño.',
          `La actividad de navegación se limita a los ${MAX_EVENTOS_EXPORT} eventos más recientes.`,
          'Los registros de CRM, pagos y contactos se cruzan por email y por el identificador anónimo de visitante previo al registro.',
        ],
      },
      perfil,
      leyesGuardadas: saved,
      carpetas: folders,
      reclamosDeBeneficio: claims,
      sesiones: sessions,
      solicitudes,
      crm: { lead, leadEvents, founder, pagos, contactos, pedidos },
      actividad: { eventos, recorrido: journey },
    };
  }

  // ── Derecho de supresión: borrado de la cuenta ───────────────────────────────

  /**
   * Borra la cuenta y anonimiza el rastro de la persona en el resto del sistema.
   *
   * Criterio (elegido con el usuario): se borra todo lo que identifica y se
   * conserva lo que no. Los pagos son la excepción explícita — se les quitan los
   * datos personales pero se mantienen monto, fecha e id de MercadoPago, porque
   * son respaldo contable y su conservación es una obligación legal propia, no
   * un uso del dato para nuestro beneficio.
   *
   * Todo corre en una transacción: o se va completo o no se toca nada. Un
   * borrado a medias dejaría a la persona sin cuenta pero con su email todavía
   * en el CRM, que es exactamente lo que vino a evitar.
   *
   * Devuelve el detalle de filas afectadas, que queda asentado en
   * `account_requests` como prueba del alcance de lo que se suprimió.
   */
  async borrarCuenta(userId: string, password: string, meta: { ip?: string; userAgent?: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    // Una cuenta de administración no se borra desde la interfaz, y no es
    // paternalismo: los emails de ADMIN_EMAILS no se pueden registrar de nuevo
    // (register los rechaza con 409 a propósito), así que borrarla dejaría el
    // panel sin acceso y sin forma de recuperarlo salvo tocando la base a mano.
    if (user.isAdmin) {
      throw new ForbiddenException(
        'Las cuentas de administración no se borran desde acá. Quitá el email de ADMIN_EMAILS primero.',
      );
    }

    // Se pide la contraseña aunque la sesión ya esté abierta: es una acción
    // irreversible y una sesión robada no debería poder ejecutarla.
    const ok = await argon2.verify(user.passwordHash, password).catch(() => false);
    if (!ok) throw new UnauthorizedException('La contraseña es incorrecta');

    const email = user.email;
    const emailHash = this.sha256(email);
    const guestId = user.guestId;
    // Sufijo único para los campos UNIQUE NOT NULL que no admiten vaciarse.
    const sufijo = randomBytes(4).toString('hex');
    const emailAnonimo = `borrado-${sufijo}@anonimizado.local`;

    const detalle = await this.prisma.$transaction(async (tx) => {
      const filas: Record<string, number> = {};

      // 1. Actividad de navegación: deja de estar atribuida a nadie. Los eventos
      //    sobreviven como estadística anónima (tipo, fecha, ruta).
      //
      //    Se borra también `context`, que es donde el tracking guarda el
      //    user-agent y la geolocalización aproximada por IP: sin eso el evento
      //    es realmente anónimo, mientras que "navegador X + ciudad Y + esta
      //    hora" vuelve a señalar a una persona aunque no tenga id encima.
      //    `properties` se conserva porque es el valor estadístico del evento
      //    (qué ley se vio, qué se buscó) y no lleva identificadores.
      filas.tracking_events = (
        await tx.trackingEvent.updateMany({
          where: guestId ? { OR: [{ userId }, { guestId }] } : { userId },
          data: { userId: null, guestId: null, context: Prisma.DbNull },
        })
      ).count;

      // 2. Recorrido congelado del visitante y cuotas de exportación: son índices
      //    por guest_id, no tienen valor sin la persona.
      if (guestId) {
        filas.user_journeys = (await tx.userJourney.deleteMany({ where: { guestId } })).count;
        filas.export_generations = (
          await tx.exportGeneration.deleteMany({ where: { guestId } })
        ).count;
      }

      // 3. Lead del CRM: se conserva la fila para no falsear el embudo (fecha,
      //    origen, UTM, provincia), pero sin nada que identifique a la persona.
      const lead = await tx.leads.findFirst({ where: { email } });
      if (lead) {
        // Los eventos del lead se borran enteros: su `payload` es JSON libre y
        // puede contener el email o el teléfono, así que no hay forma barata de
        // anonimizarlos campo por campo.
        filas.lead_events = (await tx.lead_events.deleteMany({ where: { lead_id: lead.id } })).count;
        await tx.leads.update({
          where: { id: lead.id },
          data: {
            email: null,
            nombre: null,
            telefono: null,
            notes: ANONIMO,
            guest_id: null,
            status: 'borrado',
          },
        });
        filas.leads = 1;
      }

      // 4. Contactos enviados por el formulario. El mensaje se reemplaza: es
      //    texto libre donde la gente se identifica ("soy Ariel, de tal estudio").
      filas.contact_submissions = (
        await tx.contact_submissions.updateMany({
          where: guestId ? { OR: [{ email }, { guest_id: guestId }] } : { email },
          data: {
            nombre: ANONIMO,
            apellido: null,
            email: null,
            telefono: null,
            mensaje: ANONIMO,
            user_agent: null,
            guest_id: null,
            empresa: null,
            profesion: null,
          },
        })
      ).count;

      // 5. Pedidos de producto: `detalle` es JSON libre con datos del pedido.
      //    OJO con los campos Json: van con Prisma.DbNull, NO con null ni con
      //    undefined. `undefined` hace que Prisma OMITA la columna del UPDATE y
      //    el JSON sobrevive intacto al borrado (pasó: quedó `{"caso":"despido"}`).
      filas.product_orders = (
        await tx.productOrder.updateMany({
          where: guestId ? { OR: [{ email }, { guestId }] } : { email },
          data: {
            nombre: null,
            email: null,
            telefono: null,
            detalle: Prisma.DbNull,
            guestId: null,
            notas: ANONIMO,
          },
        })
      ).count;

      // 6. Donante: se conserva el registro del aporte (montos, fechas,
      //    beneficio) sin la identidad, y se lo saca del muro público.
      const founder = await tx.founders.findFirst({ where: { email } });
      if (founder) {
        await tx.founders.update({
          where: { id: founder.id },
          data: {
            nombre: ANONIMO,
            email: emailAnonimo, // UNIQUE NOT NULL: no admite null
            telefono: null,
            mensaje: null,
            guest_id: null,
            oculto_muro: true,
          },
        });
        filas.founders = 1;
      }

      // 7. Pagos: única excepción deliberada. Se les quita todo dato personal y
      //    se conservan monto, fecha, estado e id de MercadoPago como respaldo.
      //    `metadata` suele traer el payload de MercadoPago, que incluye datos
      //    del pagador: va a DbNull (ver la nota sobre Json en el paso 5).
      filas.pagos = (
        await tx.pago.updateMany({
          where: guestId ? { OR: [{ email }, { guestId }] } : { email },
          data: { email: null, nombre: null, guestId: null, metadata: Prisma.DbNull },
        })
      ).count;

      // 8. Solicitudes previas: la fila sobrevive como prueba de cumplimiento
      //    (ver AccountRequest), pero sin el email en claro.
      filas.account_requests = (
        await tx.accountRequest.updateMany({
          where: { OR: [{ userId }, { emailHash }] },
          data: { email: null, contacto: null, ip: null, userAgent: null },
        })
      ).count;

      // 9. La cuenta. Sessions, saved_laws, folders, law_likes y benefit_claims
      //    caen por CASCADE (ver schema.prisma).
      await tx.user.delete({ where: { id: userId } });
      filas.users = 1;

      return filas;
    });

    // Asiento del borrado. Va FUERA de la transacción a propósito: si algo
    // fallara al escribirlo, el borrado ya está hecho y no queremos revertirlo
    // —el derecho del titular pesa más que la prolijidad de nuestro registro.
    await this.prisma.accountRequest
      .create({
        data: {
          type: 'account_deletion',
          userId: null,
          email: null,
          emailHash,
          status: 'resuelto',
          resolvedAt: new Date(),
          ip: meta.ip ?? null,
          userAgent: meta.userAgent?.slice(0, 500) ?? null,
          detalle: {
            ejecutadoPor: 'el propio titular desde /cuenta',
            alcance: 'borrado de la cuenta y anonimización del CRM',
            conservado: 'pagos y aportes sin datos personales (respaldo contable)',
            filasAfectadas: detalle,
          },
        },
      })
      .catch(() => undefined);

    return { ok: true, filasAfectadas: detalle };
  }
}
