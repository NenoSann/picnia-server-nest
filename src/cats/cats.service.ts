import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Cat } from "./cats.interfaces";

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = []

  create(cat: Cat): Cat {
    this.cats.push(cat)
    console.log('new cats comming😻')
    return cat
  }

  findByName(name: string): Cat {
    return this.cats.find((cat) => cat.name === name)
  }

  findAll(): Cat[] {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    return this.cats
  }

}