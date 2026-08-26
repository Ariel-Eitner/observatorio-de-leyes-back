import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SavedLawsController } from './saved-laws.controller';
import { SavedLawsService } from './saved-laws.service';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { RedactorDocsController } from './redactor-docs.controller';
import { RedactorDocsService } from './redactor-docs.service';

// Contenido del usuario: leyes guardadas, me gusta, carpetas y documentos del
// Redactor. Importa AuthModule para reusar JwtAuthGuard (depende de JwtService/env).
@Module({
  imports: [AuthModule],
  controllers: [SavedLawsController, LikesController, FoldersController, RedactorDocsController],
  providers: [SavedLawsService, LikesService, FoldersService, RedactorDocsService],
})
export class UserContentModule {}
