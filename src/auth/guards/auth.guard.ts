import { ExpressAuthInterface } from '@app/types/expressAuth.interface';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
 
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressAuthInterface>();

    if (!request.data) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
