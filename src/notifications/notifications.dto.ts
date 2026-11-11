import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CampaignDto {
  @IsUUID() requestKey: string;
  @IsString() @MinLength(1) @MaxLength(120) title: string;
  @IsString() @MinLength(1) @MaxLength(2000) body: string;
  @IsOptional() @IsString() @MaxLength(300) actionPath?: string;
  @IsIn(["product", "marketing"]) category: string;
}
export class ReadDto {
  @IsBoolean() read: boolean;
}
export class ArchiveDto {
  @IsBoolean() archived: boolean;
}
export class PreferencesDto {
  @IsBoolean() product: boolean;
  @IsBoolean() marketing: boolean;
}
export class FeedbackDto {
  @IsInt() @Min(1) @Max(5) score: number;
  @IsOptional() @IsString() @MaxLength(1500) comment?: string;
}
