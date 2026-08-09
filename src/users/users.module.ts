import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccountModule } from '../account/account.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  // AccountModule aporta AccountDataService: exportar y borrar los datos se
  // ofrecen bajo /users/me, que es donde el front ya tiene sus proxies.
  imports: [AuthModule, AccountModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
