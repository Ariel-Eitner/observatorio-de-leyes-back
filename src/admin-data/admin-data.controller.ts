import {
  Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, UseGuards,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';
import { PanelService } from './panel.service';
import { ComercialService } from './comercial.service';
import {
  AnaliticaService,
  type TrackingFields,
  type UpsertIssueTriageBody,
  type UpsertJourneyBody,
  type UpsertMetricsDailyBody,
  type UpsertMetricsSnapshotBody,
} from './analitica.service';
import type { LeadPatchBody } from './panel.service';
import { TareasService } from './tareas.service';
import { CorpusReviewService, type NormReview } from './corpus-review.service';
import { ProspectosService, type ProspectoInput } from './prospectos.service';

/**
 * Datos del panel de administración.
 *
 * Existe para sacar al frontend de la base: `app/admin/**` y `app/api/admin/**`
 * consultaban Supabase directo con la `service_role` key (que bypassea RLS). Con
 * eso, además, el panel local seguía leyendo PRODUCCIÓN aunque el stack apuntara
 * a la base del compose: la URL de Supabase no depende del DATABASE_URL.
 *
 * Todo cuelga de AdminHeaderGuard (cabecera `x-obs-admin`). El frontend valida
 * además su propia cookie de admin antes de llegar acá.
 */
@Controller('admin-data')
@SkipThrottle()
@UseGuards(AdminHeaderGuard)
export class AdminDataController {
  constructor(
    private readonly panel: PanelService,
    private readonly comercial: ComercialService,
    private readonly analitica: AnaliticaService,
    private readonly tareas: TareasService,
    private readonly corpusReview: CorpusReviewService,
    private readonly prospectos: ProspectosService,
  ) {}

  // ── Prospección comercial ───────────────────────────────────────────────────

  @Get('prospectos')
  listarProspectos() {
    return this.prospectos.listar();
  }

  @Post('prospectos')
  @HttpCode(201)
  crearProspecto(@Body() body: ProspectoInput) {
    return this.prospectos.crear(body ?? {});
  }

  @Post('prospectos/importar')
  @HttpCode(200)
  importarProspectos(@Body() body: { filas?: ProspectoInput[]; fuente?: string }) {
    return this.prospectos.importar(body?.filas ?? [], body?.fuente ?? 'csv');
  }

  @Patch('prospectos/:id')
  actualizarProspecto(@Param('id') id: string, @Body() body: ProspectoInput) {
    return this.prospectos.actualizar(id, body ?? {});
  }

  @Delete('prospectos/:id')
  borrarProspecto(@Param('id') id: string) {
    return this.prospectos.borrar(id);
  }

  @Get('prospectos/:id/eventos')
  eventosProspecto(@Param('id') id: string) {
    return this.prospectos.eventos(id);
  }

  @Post('prospectos/:id/eventos')
  @HttpCode(201)
  agregarEventoProspecto(
    @Param('id') id: string,
    @Body() body: { tipo?: string; detalle?: string; proximo_paso?: string | null; proximo_at?: string | null; etapa?: string },
  ) {
    return this.prospectos.agregarEvento(id, body ?? {});
  }

  // ── Checklist de revisión del corpus ────────────────────────────────────────

  @Get('corpus-review')
  listarCorpusReview() {
    return this.corpusReview.listar();
  }

  @Put('corpus-review')
  guardarCorpusReview(@Body() body: { path?: string; review?: Partial<NormReview> }) {
    return this.corpusReview.guardar(body.path ?? '', body.review ?? {});
  }

  // ── Tareas del panel ────────────────────────────────────────────────────────

  @Get('tareas')
  listarTareas() {
    return this.tareas.listar();
  }

  @Post('tareas')
  @HttpCode(201)
  async crearTarea(@Body() body: { texto?: string }) {
    const t = await this.tareas.crear(body.texto ?? '');
    return t ?? { error: 'texto_vacio' };
  }

  @Patch('tareas/:id')
  async actualizarTarea(
    @Param('id') id: string,
    @Body() body: { texto?: string; hecha?: boolean },
  ) {
    const t = await this.tareas.actualizar(id, body);
    return t ?? { error: 'sin_cambios' };
  }

  @Delete('tareas/:id')
  borrarTarea(@Param('id') id: string) {
    return this.tareas.borrar(id);
  }

  @Post('tareas/limpiar-hechas')
  @HttpCode(200)
  limpiarTareasHechas() {
    return this.tareas.borrarHechas();
  }

  // ── Panel: badges y contactos ───────────────────────────────────────────────

  @Get('nav-badges')
  navBadges() {
    return this.panel.navBadges();
  }

  @Post('contactos/visto')
  @HttpCode(200)
  async contactosVisto() {
    await this.panel.marcarContactosVistos();
    return { ok: true };
  }

  @Get('contactos')
  contactos() {
    return this.panel.contactos();
  }

  @Get('mensajes')
  mensajes() {
    return this.panel.mensajes();
  }

  @Get('leads/:id')
  async leadDetalle(@Param('id') id: string) {
    const d = await this.panel.leadDetalle(id);
    return d ?? { error: 'not_found' };
  }

  @Patch('leads/:id')
  leadPatch(@Param('id') id: string, @Body() body: LeadPatchBody) {
    return this.panel.leadPatch(id, body);
  }

  @Delete('leads/:id')
  leadDelete(@Param('id') id: string) {
    return this.panel.leadDelete(id);
  }

  // ── Soporte ─────────────────────────────────────────────────────────────────

  @Get('soporte')
  soporte() {
    return this.panel.soporte();
  }

  @Put('soporte')
  guardarSoporte(@Body() body: unknown) {
    return this.panel.guardarSoporte(body);
  }

  // ── Pagos, órdenes y fundadores ─────────────────────────────────────────────

  @Get('pagos')
  pagos() {
    return this.comercial.pagos();
  }

  @Delete('pagos/:id')
  borrarPago(@Param('id') id: string) {
    return this.comercial.borrarPago(id);
  }

  @Get('ordenes')
  ordenes() {
    return this.comercial.ordenes();
  }

  @Patch('ordenes/:id')
  actualizarOrden(@Param('id') id: string, @Body() body: { status: string }) {
    return this.comercial.actualizarOrden(id, body.status);
  }

  @Delete('ordenes/:id')
  borrarOrden(@Param('id') id: string) {
    return this.comercial.borrarOrden(id);
  }

  @Get('founders')
  founders() {
    return this.comercial.founders();
  }

  /** POST y no DELETE: manda una lista de ids en el body (borrado múltiple). */
  @Post('founders/eliminar')
  @HttpCode(200)
  borrarFounders(@Body() body: { ids?: string[] }) {
    return this.comercial.borrarFounders(body.ids ?? []);
  }

  @Patch('founders/:id/pagado')
  setFounderPagado(@Param('id') id: string, @Body() body: { pagado: boolean }) {
    return this.comercial.setFounderPagado(id, !!body.pagado);
  }

  // ── Usuarios ────────────────────────────────────────────────────────────────

  @Get('usuarios')
  usuarios() {
    return this.comercial.usuarios();
  }

  @Get('usuarios/:id')
  async usuario(@Param('id') id: string) {
    const u = await this.comercial.usuario(id);
    return u ?? { error: 'not_found' };
  }

  // ── Tracking ────────────────────────────────────────────────────────────────

  /**
   * POST y no GET porque los filtros son un objeto (listas de tipos, de
   * sesiones) y meterlos en la query string obligaría a serializar a mano en los
   * dos lados. No muta nada.
   */
  @Post('tracking/query')
  @HttpCode(200)
  trackingQuery(
    @Body()
    body: {
      since?: string; until?: string; guestId?: string; userIdNotNull?: boolean;
      types?: string[]; excludeTypes?: string[]; sessionIds?: string[];
      sessionNull?: boolean; fields?: TrackingFields; order?: 'asc' | 'desc';
      limit?: number; offset?: number;
    },
  ) {
    return this.analitica.trackingQuery(body);
  }

  @Get('tracking/count')
  async trackingCount(@Query('since') since?: string, @Query('until') until?: string) {
    return { count: await this.analitica.trackingCount(since, until) };
  }

  @Get('tracking/oldest')
  async trackingOldest(@Query('before') before?: string) {
    return { created_at: await this.analitica.trackingOldest(before) };
  }

  /** DESTRUCTIVO. Lo llama la purga, que re-verifica el día antes de borrarlo. */
  @Post('tracking/purge')
  @HttpCode(200)
  async purgeTracking(@Body() body: { since: string; until: string }) {
    return { purged: await this.analitica.purgeTracking(body.since, body.until) };
  }

  @Get('contact-submissions')
  contactSubmissions() {
    return this.analitica.contactSubmissions();
  }

  @Post('contact-submissions/eliminar')
  @HttpCode(200)
  borrarContactSubmissions(@Body() body: { ids?: string[] }) {
    return this.analitica.borrarContactSubmissions(body.ids ?? []);
  }

  // ── Recorridos congelados ───────────────────────────────────────────────────

  @Get('journeys')
  journeys() {
    return this.analitica.journeys();
  }

  @Get('journeys/:guestId')
  async journey(@Param('guestId') guestId: string) {
    return (await this.analitica.journey(guestId)) ?? { timeline: [], last_at: null };
  }

  @Post('journeys')
  @HttpCode(200)
  upsertJourney(@Body() body: UpsertJourneyBody) {
    return this.analitica.upsertJourney(body);
  }

  @Get('contact-guest-ids')
  async contactGuestIds() {
    return { guestIds: await this.analitica.contactGuestIds() };
  }

  // ── Métricas ────────────────────────────────────────────────────────────────

  @Get('metrics-daily')
  metricsDaily() {
    return this.analitica.metricsDaily();
  }

  @Get('metrics-daily/:day')
  async metricsDailyOne(@Param('day') day: string) {
    return (await this.analitica.metricsDailyOne(day)) ?? { error: 'not_found' };
  }

  @Post('metrics-daily')
  @HttpCode(200)
  upsertMetricsDaily(@Body() body: UpsertMetricsDailyBody) {
    return this.analitica.upsertMetricsDaily(body);
  }

  @Get('metrics-snapshot')
  async metricsSnapshot(@Query('key') key: string) {
    return (await this.analitica.metricsSnapshot(key)) ?? { empty: true };
  }

  @Post('metrics-snapshot')
  @HttpCode(200)
  upsertMetricsSnapshot(@Body() body: UpsertMetricsSnapshotBody) {
    return this.analitica.upsertMetricsSnapshot(body);
  }

  // ── Problemas (triage) ──────────────────────────────────────────────────────

  @Get('issue-triage')
  issueTriage() {
    return this.analitica.issueTriage();
  }

  @Patch('issue-triage')
  upsertIssueTriage(@Body() body: UpsertIssueTriageBody) {
    return this.analitica.upsertIssueTriage(body);
  }

  // ── Funciones de la base ────────────────────────────────────────────────────

  @Get('visitors')
  async visitors(
    @Query('filtro') filtro = 'todos',
    @Query('limit') limit = '200',
    @Query('offset') offset = '0',
    @Query('bots') bots = '0',
  ) {
    const lim = Math.min(Math.max(Number(limit) || 200, 1), 500);
    const off = Math.max(Number(offset) || 0, 0);
    return {
      visitors: await this.analitica.visitors(filtro, lim, off, bots === '1'),
      limit: lim,
      offset: off,
    };
  }

  // ── Salud del sistema ───────────────────────────────────────────────────────

  @Get('db-stats')
  async dbStats() {
    return { stats: await this.analitica.dbStats(), normsCount: await this.analitica.normsCount() };
  }

  @Get('system-health')
  async systemHealth() {
    return (await this.analitica.ultimoSystemHealth()) ?? { checked_at: null, payload: null };
  }

  @Post('system-health')
  @HttpCode(200)
  guardarSystemHealth(@Body() body: { payload: unknown }) {
    return this.analitica.guardarSystemHealth(body.payload);
  }
}
