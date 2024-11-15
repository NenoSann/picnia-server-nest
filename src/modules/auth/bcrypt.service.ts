import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

const saltRounds = 10
@Injectable()
export class BcryptService {
  async compare(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds)
  }
}