import { IsString, IsOptional, IsArray, IsInt, IsEnum, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SegmentType } from '../../common/types/law.types';

export class CreateSegmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lawId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  articleId?: string;

  @ApiProperty({ example: '5' })
  @IsString()
  @IsNotEmpty()
  articleNumber: string;

  @ApiProperty({ enum: SegmentType })
  @IsEnum(SegmentType)
  segmentType: SegmentType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalText: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plainExplanation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  practicalExample?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  references?: string[];

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order: number;
}
