import { IsNumber } from "class-validator";

export class UserIdDto{
  @IsNumber()
  readonly id: number
}
