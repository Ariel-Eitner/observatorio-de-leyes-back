import { Equals, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RequestResetDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  /**
   * Por dónde contactar a la persona. Sin proveedor de email, este campo es el
   * flujo entero: si no deja un canal, no hay forma de hacerle llegar el código.
   */
  @IsOptional() @IsString() @MaxLength(500)
  contacto?: string;
}

export class RedeemResetDto {
  @IsString() @MaxLength(40)
  codigo: string;

  @IsString()
  @MinLength(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
  @MaxLength(200)
  newPassword: string;
}

export class DeleteAccountDto {
  @IsString() @MaxLength(200)
  password: string;

  /**
   * Segunda barrera además de la contraseña: hay que escribir BORRAR a mano.
   * Se valida también acá y no solo en el formulario, porque el endpoint es
   * alcanzable directo y la acción no tiene vuelta atrás.
   */
  @Equals('BORRAR', { message: 'Escribí BORRAR para confirmar' })
  confirmacion: string;
}

export class ResolveRequestDto {
  @IsOptional() @IsString() @MaxLength(1000)
  nota?: string;
}
