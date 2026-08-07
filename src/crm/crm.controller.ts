import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FoundersService, UpsertFounderParams } from './founders.service';
import { ContactoService, CrearContactoParams } from './contacto.service';
import { LeadsService, UpsertLeadParams } from './leads.service';
import { ProductOrdersService, CrearOrdenParams } from './product-orders.service';
import { PagosService, PagoRow, TierAplicado } from './pagos.service';

/**
 * Endpoints públicos de CRM: alta de fundador, muro, contacto/feedback y leads.
 *
 * Antes esto lo hacía el frontend contra Supabase con la `service_role` key.
 *
 * La VALIDACIÓN Y EL RATE LIMIT siguen en el route handler de Next, que es quien
 * ve la IP del visitante y ya tiene `sanitizeLine`, `EMAIL_RE`, `createRateLimiter`
 * y `consentProof`. Duplicarlos acá sería tener dos definiciones de lo mismo. Este
 * controller recibe datos ya saneados desde el propio servidor de Next, no desde
 * el browser.
 */
@Controller('crm')
export class CrmController {
  constructor(
    private readonly founders: FoundersService,
    private readonly contacto: ContactoService,
    private readonly leads: LeadsService,
    private readonly ordenes: ProductOrdersService,
    private readonly pagos: PagosService,
  ) {}

  // ── Fundadores ──────────────────────────────────────────────────────────────

  @Post('founders')
  @HttpCode(200)
  async crearFounder(@Body() dto: UpsertFounderParams) {
    await this.founders.upsert(dto);
    return { ok: true };
  }

  @Get('founders/count')
  async contarFounders() {
    return { count: await this.founders.count() };
  }

  /** Muro público: alimenta la home y /fundadores. */
  @Get('founders/wall')
  async muro() {
    return { founders: await this.founders.wall() };
  }

  @Post('founders/:email/comprobante')
  @HttpCode(200)
  async comprobante(
    @Param('email') email: string,
    @Body() body: { url: string; nombre?: string | null; canal?: string | null },
  ) {
    const ok = await this.founders.adjuntarComprobante(decodeURIComponent(email), body.url, {
      nombre: body.nombre,
      canal: body.canal,
    });
    return { ok };
  }

  // ── Contacto / feedback ─────────────────────────────────────────────────────

  @Post('contacto')
  @HttpCode(200)
  async crearContacto(@Body() dto: CrearContactoParams) {
    const row = await this.contacto.crear(dto);
    return { ok: true, id: row.id };
  }

  @Post('contacto/:id/leido')
  @HttpCode(200)
  async marcarLeido(@Param('id') id: string) {
    await this.contacto.marcarLeido(id);
    return { ok: true };
  }

  // ── Leads ───────────────────────────────────────────────────────────────────

  /** Para los flujos que solo dejan un lead (descarga de PDF, newsletter). */
  @Post('leads')
  @HttpCode(200)
  async upsertLead(@Body() dto: UpsertLeadParams) {
    const id = await this.leads.upsert(dto);
    return { ok: true, leadId: id };
  }

  // ── Órdenes de producto ─────────────────────────────────────────────────────

  @Post('ordenes')
  @HttpCode(200)
  async crearOrden(@Body() dto: CrearOrdenParams) {
    const id = await this.ordenes.crear(dto);
    return { ok: true, id };
  }

  // ── Pagos ───────────────────────────────────────────────────────────────────
  // La integración con Mercado Pago (preferencias, tokens, firma HMAC del
  // webhook) sigue en el frontend: ahí llega el request y ahí están los secretos.
  // Acá vive solo la persistencia.

  @Post('pagos')
  @HttpCode(200)
  async crearPago(@Body() dto: Record<string, unknown>) {
    return this.pagos.crear(dto);
  }

  @Post('pagos/:id')
  @HttpCode(200)
  async actualizarPago(@Param('id') id: string, @Body() patch: Record<string, unknown>) {
    const row = await this.pagos.actualizar(id, patch);
    return row ?? { error: 'not_found' };
  }

  /** Lo consulta el checkout mientras espera la confirmación de MP. */
  @Get('pagos/:id/estado')
  async estadoPago(@Param('id') id: string) {
    const e = await this.pagos.estado(id);
    return e ?? { error: 'not_found' };
  }

  @Get('pagos/:id')
  async verPago(@Param('id') id: string) {
    const row = await this.pagos.porId(id);
    return row ?? { error: 'not_found' };
  }

  @Get('pagos/por-mp/:mpPaymentId')
  async porMp(@Param('mpPaymentId') mpPaymentId: string) {
    const row = await this.pagos.porMpPaymentId(mpPaymentId);
    return row ?? { error: 'not_found' };
  }

  /**
   * El front resuelve el tier (fundadorTiers.ts) y el tipo de cambio (getDolar)
   * y los manda ya calculados: las dos cosas también las usa la UI y duplicarlas
   * acá sería garantizar que se desincronicen.
   */
  @Post('apoyo-aprobado')
  @HttpCode(200)
  async apoyoAprobado(
    @Body() body: { pago: PagoRow; tier: TierAplicado | null; tipoCambio: number | null },
  ) {
    const founderId = await this.pagos.aplicarApoyoAprobado(body.pago, body.tier, body.tipoCambio);
    return { founderId };
  }
}
