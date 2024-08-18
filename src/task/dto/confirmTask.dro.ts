import { IsSpecificBoolean } from "@app/validator/customBoolean.decorator";
import { IsNotEmpty, IsNumber } from "class-validator";


export class ConfirmTaskDto {
  @IsNumber()
  readonly id: number;

  @IsSpecificBoolean(true)
  @IsNotEmpty()
  readonly confirmCustomer: true;
}
