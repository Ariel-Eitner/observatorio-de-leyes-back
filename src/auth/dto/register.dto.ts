import { IsEmail, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ProfileFieldsDto } from '../../common/dto/profile-fields.dto';

// Hereda nombre + los campos de perfil opcionales (apellido, teléfono, etc.).
// Solo email y password son obligatorios.
export class RegisterDto extends ProfileFieldsDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(200)
  password: string;

  // guestId anónimo del front (localStorage obs_guest_id) para migrar el
  // recorrido al crear la cuenta. Ver docs/sistema-usuarios.html, arista A6.
  @IsOptional() @IsString() @MaxLength(64)
  guestId?: string;

  @IsOptional() @IsString() @MaxLength(32)
  consentVersion?: string;
}
