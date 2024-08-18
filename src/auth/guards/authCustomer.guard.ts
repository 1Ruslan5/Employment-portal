import { ExpressAuthInterface } from "@app/types/expressAuth.interface";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";



@Injectable()
export class AuthCustomerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean  {
      const request = context.switchToHttp().getRequest<ExpressAuthInterface>();

      if(!request.data){
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }

      if(request.data.user.role !== "CUSTOMER"){
        throw new HttpException('Not enough permissions to this functions', HttpStatus.FORBIDDEN);
      }

      return true
  }
}