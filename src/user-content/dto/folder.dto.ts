import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFolderDto {
  @IsString() @IsNotEmpty() @MaxLength(60)
  name: string;
}

export class RenameFolderDto {
  @IsString() @IsNotEmpty() @MaxLength(60)
  name: string;
}
