import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";


class UpdateCv {
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
  readonly phone_numbers: string | null;

  @IsString()
  @MaxLength(2000)
  readonly about_your_self: string | null;

  @IsNotEmpty()
  @IsString()
  @MaxLength(750)
  readonly skills: string;

  @IsString()
  @MaxLength(2000)
  readonly experience: string | null;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  readonly languages: string;

  @IsString()
  @MaxLength(1500)
  readonly projects: string | null;
}

export class UpdateCvDto extends PartialType(UpdateCv) {}
