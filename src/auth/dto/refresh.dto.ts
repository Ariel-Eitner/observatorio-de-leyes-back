import { IsString, MaxLength } from 'class-validator';

// En el modelo BFF el front lee su cookie httpOnly y reenvía el refresh token
// en el body hacia NestJS. logout usa el mismo DTO.
export class RefreshDto {
  @IsString() @MaxLength(200)
  refreshToken: string;
}
