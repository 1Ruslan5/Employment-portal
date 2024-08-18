import { ExpressAuthInterface } from "@app/types/expressAuth.interface";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";


@Injectable()
export class AuthSubmitterGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<ExpressAuthInterface>();

      if (!request.data) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }

      if(request.data.user.role !== "SUBMITTER") {
        throw new HttpException('Not enough permissions to this functions', HttpStatus.FORBIDDEN);
      }

      return true;
  }
}