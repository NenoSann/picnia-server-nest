import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cats.interfaces';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) { }
  @Get()
  getAllCats(): string {
    return 'This action will returns all cat';
  }

  @Get('all')
  getAll(): void {
    this.catsService.findAll()
  }

  @Get('breed')
  getBreed(): string {
    return 'This action will return all breeds of cats';
  }

  @Post()
  createCat(@Body() cat: Cat): Cat {
    return this.catsService.create(cat)
  }


} 
