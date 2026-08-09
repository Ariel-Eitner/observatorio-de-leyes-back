import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccountController } from './account.controller';
import { AccountAdminController } from './account-admin.controller';
import { AccountRequestsService } from './account-requests.service';
import { AccountDataService } from './account-data.service';

/**
 * Todo lo que una persona puede hacer sobre su propia cuenta más allá de usarla:
 * recuperar la contraseña, pedir una copia de sus datos y borrarla.
 *
 * Importa AuthModule (necesita AuthService para emitir la sesión después de un
 * reset) y exporta AccountDataService para que UsersController pueda ofrecer
 * exportar/borrar bajo /users/me, donde el frontend ya tiene todo cableado.
 * La dirección de las dependencias es Users → Account → Auth: sin ciclos.
 */
@Module({
  imports: [AuthModule],
  controllers: [AccountController, AccountAdminController],
  providers: [AccountRequestsService, AccountDataService],
  exports: [AccountRequestsService, AccountDataService],
})
export class AccountModule {}
