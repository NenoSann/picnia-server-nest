import { Body, Controller, forwardRef, Get, Post, Inject } from "@nestjs/common";
import { CreateCommentsDto, QueryCommentsDto } from "./dto";
import { CommentService } from "./comment.service";
@Controller('comment')
export class CommentController {
  constructor(
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService
  ) { }
  @Get('test')
  test() {
    return 'test'
  }

  @Post('create')
  create(@Body() createCommentDto: CreateCommentsDto) {
    return this.commentService.createComments(createCommentDto)
  }

  @Get('get')
  get(@Body() queryCommentsDto: QueryCommentsDto) {
    console.log('queryCommentsDto ', queryCommentsDto)
    return this.commentService.queryPostComments(queryCommentsDto.postId)
  }
}