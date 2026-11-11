import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  IsEmail,
  IsObject,
  IsBoolean,
  Equals,
} from "class-validator";

export class CreateOrderDto {
  @IsUUID() requestKey: string;
  @IsIn(["pro", "apoyo", "descargas"]) tipo: "pro" | "apoyo" | "descargas";
  @IsOptional() @IsString() @MaxLength(80) producto?: string;
  @IsOptional() @IsString() @MaxLength(80) catalogVersion?: string;
  @IsOptional() @IsInt() @Min(1000) @Max(10000000) monto?: number;
  @IsOptional() @IsEmail() @MaxLength(200) email?: string;
  @IsOptional() @IsString() @MaxLength(120) nombre?: string;
}
export class SubscriptionDto {
  @IsUUID() requestKey: string;
  @IsString() @MaxLength(80) catalogVersion: string;
  @IsOptional() @IsEmail() @MaxLength(200) payerEmail?: string;
  @IsBoolean() @Equals(true) consent: boolean;
}
export class CancelSubscriptionDto {
  @IsBoolean() @Equals(true) confirmed: boolean;
}
export class SimulateSubscriptionDto {
  @IsBoolean() pay: boolean;
}
export class SubmitPaymentDto {
  @IsUUID() orderId: string;
  @IsUUID() attemptKey: string;
  @IsObject() formData: Record<string, unknown>;
}
export class PreferenceDto {
  @IsUUID() orderId: string;
}
