import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsDateString, IsArray } from 'class-validator';

export class CreateEgresoDto {
  @IsDateString()
  fecha: string;

  @IsString() @IsNotEmpty()
  proveedor: string;

  @IsString() @IsNotEmpty()
  categoria: string;

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

  @IsOptional() @IsString()
  comprobante?: string;

  @IsOptional() @IsString()
  estado?: string; // pagado | pendiente

  @IsOptional() @IsBoolean()
  recurrente?: boolean;

  @IsOptional() @IsArray() @IsString({ each: true })
  mesesPagados?: string[]; // recurrentes: meses "YYYY-MM" pagados
}
