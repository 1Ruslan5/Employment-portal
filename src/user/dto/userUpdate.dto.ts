import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsString, MinLength } from "class-validator";


class UserUpdate {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class UserUpdateDto extends PartialType(UserUpdate) {}