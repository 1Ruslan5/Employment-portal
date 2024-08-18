import { ResUser } from '@app/user/types/resUser';
import { Request } from 'express';

export interface ExpressAuthInterface extends Request {
  data?: ResUser;
}
