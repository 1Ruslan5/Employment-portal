import { UserWithTokenDto } from '../dto/userWithToken.dto';
import { UserType } from './user.type';

export interface ResUserWithToken {
  user: UserType & UserWithTokenDto;
}
