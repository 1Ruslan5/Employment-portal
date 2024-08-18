import { IsSpecificBoolean } from "@app/validator/customBoolean.decorator";
import { IsNotEmpty, IsNumber } from "class-validator";


export class CompleteTaskDto {
  @IsNumber()
  readonly id: number;

  @IsSpecificBoolean(true)
  @IsNotEmpty()
  readonly completed: true;
}