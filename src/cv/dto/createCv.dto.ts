import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateCvDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  readonly position: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly full_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @MaxLength(40)
  @IsOptional()
  readonly phone_numbers?: string | null;

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  readonly about_your_self?: string | null;

  @IsNotEmpty()
  @IsString()
  @MaxLength(750)
  readonly skills: string;

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  readonly experience?: string | null;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  readonly languages: string;

  @IsString()
  @MaxLength(1500)
  @IsOptional()
  readonly projects?: string | null;
}