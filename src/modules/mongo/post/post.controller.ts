import { Controller, Inject, UseInterceptors, UploadedFiles, Post, Get, Query, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { queryUserPostsDto } from './dto';
@Controller('post')
export class PostController {
  constructor(
    @Inject(PostService)
    private readonly postService: PostService
  ) { }


  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'json', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]))
  async createPost(@UploadedFiles() files: {
    json?: Express.Multer.File[],
    image?: Express.Multer.File[]
  }) {
    const jsonBuffer = files.json[0].buffer;
    const imageBuffer = files.image[0].buffer;
    const createPostDto = JSON.parse(jsonBuffer.toString());
    return this.postService.createPost({
      imageBuffer,
      ...createPostDto
    });
  }

  @Get('get')
  async getPost(@Query() query: queryUserPostsDto) {
    return this.postService.queryUserPostsByType(query);
  }
}