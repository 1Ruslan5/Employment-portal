import { IsString } from "class-validator";


export class UserWithTokenDto {
  @IsString()
  token: string
}