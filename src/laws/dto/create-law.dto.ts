import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsArray,
  IsDateString,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LawStatus, Jurisdiction, NormType } from '../../common/types/law.types';

export class CreateLawDto {
  @ApiProperty({ example: '25326' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: 'Ley de Protección de los Datos Personales' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({ example: 2000 })
  @IsInt()
  @Min(1853)
  year: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  sanctionDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  promulgationDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  publicationDate?: string;

  @ApiPropertyOptional({ example: '30.036' })
  @IsOptional()
  @IsString()
  boNumber?: string;

  @ApiPropertyOptional({ enum: LawStatus, default: LawStatus.VIGENTE })
  @IsOptional()
  @IsEnum(LawStatus)
  status?: LawStatus;

  @ApiPropertyOptional({ enum: Jurisdiction, default: Jurisdiction.NACIONAL })
  @IsOptional()
  @IsEnum(Jurisdiction)
  jurisdiction?: Jurisdiction;

  @ApiPropertyOptional({ enum: NormType, default: NormType.LEY })
  @IsOptional()
  @IsEnum(NormType)
  normType?: NormType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  issuingBody?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullText?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  topics?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedNorms?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  executiveSummary?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  objective?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  problemItSolves?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  practicalImpact?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  affectedSubjects?: string[];
}
