import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

// El secreto y TTL del access token se pasan explícitamente en cada sign/verify
// (leyendo process.env en runtime), así que JwtModule se registra vacío.
// Re-exportamos JwtModule para que otros módulos que reusan JwtAuthGuard (p.ej.
// UserContentModule) tengan JwtService disponible al instanciar el guard.
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
