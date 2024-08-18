import { AuthService } from "@app/auth/auth.service";
import { ExpressAuthInterface } from "@app/types/expressAuth.interface";
import { UserService } from "@app/user/user.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ){}

  async use(req:ExpressAuthInterface, res: Response, next:NextFunction){
    if(!req.headers.authorization) {
      req.data = null;
      next();
      return;
    }

    try {
      const decode = this.authService.decodeAuthJwtToken(req.headers.authorization);
      const user = await this.userService.getUserById(decode.id);
      req.data = user
      next();
    } catch (error) {
      req.data = null;
      next();
    }
  }
}