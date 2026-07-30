import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class LikeDto {
  @IsString() @IsNotEmpty() @MaxLength(120)
  normId: string;

  // Vacío/ausente = like a la norma entera; con valor = a un artículo.
  @IsOptional() @IsString() @MaxLength(120)
  articleId?: string;
}
