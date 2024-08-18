import { IsEmail, isNotEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsUserRole } from '../../validator/userRoles.decorator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsUserRole()
  readonly role: string;
}
