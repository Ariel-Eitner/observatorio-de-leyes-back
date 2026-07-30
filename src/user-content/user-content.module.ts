import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SavedLawsController } from './saved-laws.controller';
import { SavedLawsService } from './saved-laws.service';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';

// Contenido del usuario: leyes guardadas y me gusta. Importa AuthModule para
// reusar JwtAuthGuard + AuthEnabledGuard (que dependen de JwtService/env).
@Module({
  imports: [AuthModule],
  controllers: [SavedLawsController, LikesController, FoldersController],
  providers: [SavedLawsService, LikesService, FoldersService],
})
export class UserContentModule {}
