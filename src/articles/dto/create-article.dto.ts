import { IsString, IsOptional, IsArray, IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lawId: string;

  @ApiProperty({ example: '5' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalText: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentText: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plainLanguageExplanation?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  practicalEffects?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  examples?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedArticles?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  jurisprudence?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  regulations?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order: number;
}
