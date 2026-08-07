import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { MonitorInterceptor } from './monitor.interceptor';

/**
 * Global porque el interceptor se registra a nivel app y necesita el servicio
 * inyectado sin que cada módulo tenga que importar este.
 *
 * Se apaga entero con MONITOR_ENABLED=false: el interceptor sigue registrado pero
 * devuelve en la primera línea, así que el costo pasa a ser una comparación.
 */
@Global()
@Module({
  controllers: [MonitorController],
  providers: [MonitorService, { provide: APP_INTERCEPTOR, useClass: MonitorInterceptor }],
  exports: [MonitorService],
})
export class MonitorModule {}
