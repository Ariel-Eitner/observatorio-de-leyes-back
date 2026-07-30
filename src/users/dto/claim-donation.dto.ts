import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class ClaimDonationDto {
  @IsString() @IsNotEmpty() @MaxLength(1000)
  detalle: string;

  @IsOptional() @IsString() @MaxLength(60)
  monto?: string;

  @IsOptional() @IsString() @MaxLength(40)
  fecha?: string;

  @IsOptional() @IsString() @MaxLength(60)
  medio?: string;

  @IsOptional() @IsString() @MaxLength(500)
  comprobanteUrl?: string;
}
