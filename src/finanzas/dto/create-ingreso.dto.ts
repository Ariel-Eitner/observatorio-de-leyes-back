import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateIngresoDto {
  @IsDateString()
  fecha: string;

  @IsString() @IsNotEmpty()
  tipo: string;

  @IsOptional() @IsString()
  plan?: string;

  @IsOptional() @IsString()
  cliente?: string;

  @IsOptional() @IsString()
  descripcion?: string;

  @IsNumber()
  monto: number;

  @IsString()
  moneda: string;

  @IsOptional() @IsNumber()
  tipoCambio?: number;

  @IsOptional() @IsNumber()
  montoArs?: number;

  @IsString()
  medioCobro: string;

  @IsOptional() @IsString()
  facturaAfip?: string;

  @IsOptional() @IsString()
  periodo?: string;
}
