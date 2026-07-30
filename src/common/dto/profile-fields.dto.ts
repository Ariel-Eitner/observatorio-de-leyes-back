import { IsOptional, IsString, MaxLength } from 'class-validator';

// Campos de perfil opcionales, compartidos entre el registro y la edición de
// perfil. Nada es obligatorio: el usuario deja los datos que quiera.
export class ProfileFieldsDto {
  @IsOptional() @IsString() @MaxLength(120)
  nombre?: string;

  @IsOptional() @IsString() @MaxLength(120)
  apellido?: string;

  @IsOptional() @IsString() @MaxLength(30)
  telefono?: string;

  @IsOptional() @IsString() @MaxLength(40)
  tipoUsuario?: string;

  @IsOptional() @IsString() @MaxLength(120)
  profesion?: string;

  @IsOptional() @IsString() @MaxLength(120)
  especialidad?: string;

  @IsOptional() @IsString() @MaxLength(120)
  empresa?: string;

  @IsOptional() @IsString() @MaxLength(60)
  provincia?: string;
}
