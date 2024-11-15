import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  private readonly authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization
    if (!authorization || authorization.startsWith('Bearer ')) {
      throw new HttpException('no authorization', HttpStatus.FORBIDDEN)
    }
    const token = authorization.split(' ')[1]
    if (this.authService.verifyJWT(token)) {
      next()
    }
  }
}