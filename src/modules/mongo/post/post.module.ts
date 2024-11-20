import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.provider';
import { MongodModule } from '../mongod.module';
import { UserModule } from '../user/user.module';
import { ImageBucketModule } from '@/modules/image-bucket/image-bucket.module';

@Module({
  imports: [MongodModule, forwardRef(() => UserModule), ImageBucketModule],
  providers: [PostService, Post],
  controllers: [PostController],
  exports: [PostService, Post]
})
export class PostModule { }
