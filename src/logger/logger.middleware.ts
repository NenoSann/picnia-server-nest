import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request is comming...')
    next()
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Logger but in function')
  next()
}