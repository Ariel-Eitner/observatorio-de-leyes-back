import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { LawStatus, Jurisdiction, NormType } from '../../common/types/law.types';

export class QueryLawDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ enum: LawStatus })
  @IsOptional()
  @IsEnum(LawStatus)
  status?: LawStatus;

  @ApiPropertyOptional({ enum: Jurisdiction })
  @IsOptional()
  @IsEnum(Jurisdiction)
  jurisdiction?: Jurisdiction;

  @ApiPropertyOptional({ enum: NormType })
  @IsOptional()
  @IsEnum(NormType)
  normType?: NormType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topic?: string;

  @ApiPropertyOptional({ description: 'Filtrar por categoría (genero, ambiental, salud, laboral, economica, consumidor, educacion, transparencia, ninez, penal, civil, aduanero, constitucion)' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1853)
  yearFrom?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearTo?: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ enum: ['number', 'year', 'title', 'createdAt'], default: 'year' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'year';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  @Transform(({ value }) => value?.toLowerCase())
  order?: 'asc' | 'desc' = 'desc';
}
