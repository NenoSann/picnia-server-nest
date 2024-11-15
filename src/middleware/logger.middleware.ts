import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentTime = new Date().toISOString();
    console.log(`\x1b[36mURL:\x1b[0m ${req.url}`);
    console.log(`\x1b[33mParameters:\x1b[0m ${JSON.stringify(req.body)}`);
    console.log(`\x1b[32mTime:\x1b[0m ${currentTime}`);
    next();
  }
}