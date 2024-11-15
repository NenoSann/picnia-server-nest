import { Module } from '@nestjs/common';
import { mongodProvider } from './mongod.provider';

@Module({
  providers: [...mongodProvider],
  exports: [...mongodProvider]
})
export class MongodModule { }
