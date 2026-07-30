import { IsEmail, IsString, IsOptional, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString() @MaxLength(200)
  password: string;

  @IsOptional() @IsString() @MaxLength(64)
  guestId?: string;
}
