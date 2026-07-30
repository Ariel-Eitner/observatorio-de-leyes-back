import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class SaveLawDto {
  // id canónico de la norma (norms.id).
  @IsString() @IsNotEmpty() @MaxLength(120)
  normId: string;

  @IsOptional() @IsString() @MaxLength(500)
  nota?: string;

  // Carpeta destino (uuid) o "" para sin carpeta. Se valida ownership en el service.
  @IsOptional() @IsString() @MaxLength(64)
  folderId?: string;
}
