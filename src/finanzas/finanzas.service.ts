import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateEgresoDto } from './dto/create-egreso.dto';
import { CreateIngresoDto } from './dto/create-ingreso.dto';

@Injectable()
export class FinanzasService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Egresos ───────────────────────────────────────────────────────────────────

  async createEgreso(dto: CreateEgresoDto) {
    return this.prisma.egreso.create({
      data: {
        fecha:      new Date(dto.fecha),
        proveedor:  dto.proveedor,
        categoria:  dto.categoria,
        descripcion: dto.descripcion,
        monto:      dto.monto,
        moneda:     dto.moneda,
        tipoCambio: dto.tipoCambio,
        montoArs:   dto.montoArs,
        comprobante: dto.comprobante,
        estado:     dto.estado ?? 'pagado',
        recurrente: dto.recurrente ?? false,
      },
    });
  }

  async findAllEgresos(desde?: string, hasta?: string) {
    return this.prisma.egreso.findMany({
      where: {
        fecha: {
          ...(desde ? { gte: new Date(desde) } : {}),
          ...(hasta ? { lte: new Date(hasta) } : {}),
        },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async updateEgreso(id: string, dto: Partial<CreateEgresoDto>) {
    return this.prisma.egreso.update({
      where: { id },
      data: {
        ...(dto.fecha      ? { fecha: new Date(dto.fecha) } : {}),
        ...(dto.proveedor  !== undefined ? { proveedor: dto.proveedor } : {}),
        ...(dto.categoria  !== undefined ? { categoria: dto.categoria } : {}),
        ...(dto.descripcion !== undefined ? { descripcion: dto.descripcion } : {}),
        ...(dto.monto      !== undefined ? { monto: dto.monto } : {}),
        ...(dto.moneda     !== undefined ? { moneda: dto.moneda } : {}),
        ...(dto.tipoCambio !== undefined ? { tipoCambio: dto.tipoCambio } : {}),
        ...(dto.montoArs   !== undefined ? { montoArs: dto.montoArs } : {}),
        ...(dto.comprobante !== undefined ? { comprobante: dto.comprobante } : {}),
        ...(dto.estado     !== undefined ? { estado: dto.estado } : {}),
        ...(dto.recurrente !== undefined ? { recurrente: dto.recurrente } : {}),
      },
    });
  }

  async deleteEgreso(id: string) {
    return this.prisma.egreso.delete({ where: { id } });
  }

  // ── Ingresos ──────────────────────────────────────────────────────────────────

  async createIngreso(dto: CreateIngresoDto) {
    return this.prisma.ingreso.create({
      data: {
        fecha:       new Date(dto.fecha),
        tipo:        dto.tipo,
        plan:        dto.plan,
        cliente:     dto.cliente,
        descripcion: dto.descripcion,
        monto:       dto.monto,
        moneda:      dto.moneda,
        tipoCambio:  dto.tipoCambio,
        montoArs:    dto.montoArs,
        medioCobro:  dto.medioCobro,
        facturaAfip: dto.facturaAfip,
        periodo:     dto.periodo,
      },
    });
  }

  async findAllIngresos(desde?: string, hasta?: string) {
    return this.prisma.ingreso.findMany({
      where: {
        fecha: {
          ...(desde ? { gte: new Date(desde) } : {}),
          ...(hasta ? { lte: new Date(hasta) } : {}),
        },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async updateIngreso(id: string, dto: Partial<CreateIngresoDto>) {
    return this.prisma.ingreso.update({
      where: { id },
      data: {
        ...(dto.fecha       ? { fecha: new Date(dto.fecha) } : {}),
        ...(dto.tipo        !== undefined ? { tipo: dto.tipo } : {}),
        ...(dto.plan        !== undefined ? { plan: dto.plan } : {}),
        ...(dto.cliente     !== undefined ? { cliente: dto.cliente } : {}),
        ...(dto.descripcion !== undefined ? { descripcion: dto.descripcion } : {}),
        ...(dto.monto       !== undefined ? { monto: dto.monto } : {}),
        ...(dto.moneda      !== undefined ? { moneda: dto.moneda } : {}),
        ...(dto.tipoCambio  !== undefined ? { tipoCambio: dto.tipoCambio } : {}),
        ...(dto.montoArs    !== undefined ? { montoArs: dto.montoArs } : {}),
        ...(dto.medioCobro  !== undefined ? { medioCobro: dto.medioCobro } : {}),
        ...(dto.facturaAfip !== undefined ? { facturaAfip: dto.facturaAfip } : {}),
        ...(dto.periodo     !== undefined ? { periodo: dto.periodo } : {}),
      },
    });
  }

  async deleteIngreso(id: string) {
    return this.prisma.ingreso.delete({ where: { id } });
  }

  // ── Resumen mensual ───────────────────────────────────────────────────────────

  async resumen(desde?: string, hasta?: string) {
    const [egresos, ingresos] = await Promise.all([
      this.findAllEgresos(desde, hasta),
      this.findAllIngresos(desde, hasta),
    ]);

    // Equivalente en USD por registro: si es USD, el monto; si es ARS, monto / tipoCambio.
    const usd = (x: { moneda: string; monto: number; tipoCambio: number | null }) =>
      x.moneda === 'USD' ? x.monto : (x.tipoCambio ? x.monto / x.tipoCambio : 0);

    const pagados    = egresos.filter(e => e.estado !== 'pendiente');
    const pendientes = egresos.filter(e => e.estado === 'pendiente');

    const pagadoUsd            = pagados.reduce((s, e) => s + usd(e), 0);
    const pendienteUsd         = pendientes.reduce((s, e) => s + usd(e), 0);
    const recurrenteMensualUsd = egresos.filter(e => e.recurrente).reduce((s, e) => s + usd(e), 0);

    const porCategoria: Record<string, number> = {};
    for (const e of pagados) {
      porCategoria[e.categoria] = (porCategoria[e.categoria] ?? 0) + usd(e);
    }

    const totalIngresosUsd = ingresos.reduce((s, i) => s + usd(i), 0);
    const totalIngresosArs = ingresos.filter(i => i.moneda === 'ARS').reduce((s, i) => s + i.monto, 0);

    return {
      egresos: {
        pagadoUsd,
        pendienteUsd,
        recurrenteMensualUsd,
        count: pagados.length,
        countPendiente: pendientes.length,
        porCategoria,
      },
      ingresos: { totalUsd: totalIngresosUsd, totalArs: totalIngresosArs, count: ingresos.length },
      balanceUsd: totalIngresosUsd - pagadoUsd,
    };
  }
}
