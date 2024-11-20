import { Injectable, Module, Post } from "@nestjs/common";
import { MongodModule } from '../mongod.module';
import { CommentProvider } from "./comment.provider";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { PostModule } from "../post/post.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [MongodModule, PostModule, UserModule],
  providers: [CommentProvider, CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule { }

