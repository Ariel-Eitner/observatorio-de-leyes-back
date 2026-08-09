import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AccountRequestsService } from './account-requests.service';
import { ResolveRequestDto } from './dto/account.dto';
import { AdminHeaderGuard } from '../common/guards/admin-header.guard';

/**
 * Cola de solicitudes de cuenta para el panel. Protegido por AdminHeaderGuard
 * (cabecera x-obs-admin = ADMIN_SECRET), igual que el resto del admin: solo el
 * frontend, que ya validó la cookie de administración, llega hasta acá.
 */
@Controller('admin/account-requests')
@UseGuards(AdminHeaderGuard)
export class AccountAdminController {
  constructor(private readonly svc: AccountRequestsService) {}

  @Get()
  listar(@Query('status') status?: string) {
    return this.svc.listar(status);
  }

  /**
   * Aprueba y emite el código. La respuesta trae el código EN CLARO y es la
   * única vez que existe fuera de su hash: si se pierde, se aprueba de nuevo.
   */
  @Post(':id/aprobar')
  @HttpCode(200)
  aprobar(@Param('id') id: string, @Body() dto: ResolveRequestDto) {
    return this.svc.aprobar(id, dto.nota);
  }

  @Post(':id/rechazar')
  @HttpCode(200)
  rechazar(@Param('id') id: string, @Body() dto: ResolveRequestDto) {
    return this.svc.rechazar(id, dto.nota);
  }
}
