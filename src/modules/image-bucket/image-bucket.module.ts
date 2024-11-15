import { Module } from '@nestjs/common';
import { ImageBucketService } from './image-bucket.service';

@Module({
  providers: [ImageBucketService]
})
export class ImageBucketModule {}
