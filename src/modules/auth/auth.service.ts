import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  private secretKey: string

  constructor() {
    if (!process.env['JWT_KEY']) {
      throw new Error('JWT_KEY not in the .env, fail to initialize')
    }
    this.secretKey = process.env.JWT_KEY
  }

  createJWT(UserID: string, expireDay: number = 30): string {
    const token = jwt.sign({ UserID }, this.secretKey, { expiresIn: expireDay })
    return token
  }

  verifyJWT(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey)
      return true
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new HttpException('Jwt expired', HttpStatus.UNAUTHORIZED)
      }
      throw new HttpException('Jwt invalide', HttpStatus.UNAUTHORIZED)
    }
  }
}