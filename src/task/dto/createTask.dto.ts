import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly submitterId: number;
}