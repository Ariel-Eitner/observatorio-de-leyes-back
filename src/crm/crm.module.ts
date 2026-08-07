import { Module } from '@nestjs/common';
import { CrmController } from './crm.controller';
import { LeadsService } from './leads.service';
import { FoundersService } from './founders.service';
import { ContactoService } from './contacto.service';
import { ProductOrdersService } from './product-orders.service';
import { PagosService } from './pagos.service';

/**
 * CRM: leads, fundadores y mensajes de contacto.
 *
 * Existe para sacar al frontend de la base: estas tablas las escribía Next.js
 * directo contra Supabase con la `service_role` key, desde rutas públicas.
 *
 * Se exporta LeadsService porque otros módulos lo van a necesitar (pagos y
 * órdenes de producto también dan de alta leads).
 */
@Module({
  controllers: [CrmController],
  providers: [LeadsService, FoundersService, ContactoService, ProductOrdersService, PagosService],
  exports: [LeadsService, FoundersService, PagosService],
})
export class CrmModule {}
