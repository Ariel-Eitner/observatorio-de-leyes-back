import { IsOptional, IsString, MaxLength } from 'class-validator';

// El content es el JSON de Tiptap serializado. 200 KB es holgado (el front limita
// cada documento a 50 KB): el tope de acá es un cinturón contra abuso, no la UX.
export const MAX_CONTENT_BYTES = 200 * 1024;

export class CreateRedactorDocDto {
  @IsString() @MaxLength(200)
  title: string;

  @IsString()
  content: string;
}

export class UpdateRedactorDocDto {
  @IsOptional() @IsString() @MaxLength(200)
  title?: string;

  @IsOptional() @IsString()
  content?: string;
}
