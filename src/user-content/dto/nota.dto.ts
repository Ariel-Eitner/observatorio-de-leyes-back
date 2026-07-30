import { IsOptional, IsString, MaxLength } from 'class-validator';

export class NotaDto {
  @IsOptional() @IsString() @MaxLength(500)
  nota?: string;

  // Carpeta destino (uuid) o "" para sacarla de la carpeta.
  @IsOptional() @IsString() @MaxLength(64)
  folderId?: string;
}
