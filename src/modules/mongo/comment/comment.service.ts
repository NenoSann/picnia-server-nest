import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Model } from 'mongoose';
import { CommentDocument, CreateCommentsDto, IComment, ICommentsInfo } from "./dto";
import { IPost } from "../post/post.dto";
import { IUser, UserDocument } from "../user/user.interface";

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_MODEL')
    private readonly commentModel: Model<IComment>,
    @Inject('POST_MODEL')
    private readonly postModel: Model<IPost>,
    @Inject('USER_MODEL')
    private readonly userModel: Model<IUser>
  ) { }

  test() {
    return 'test'
  }

  async queryPostComments(postId: string) {
    try {
      const comments = (await this.postModel.findById(postId).lean()).comments
      return await this.generateCommentInfo(comments)
    } catch (error) {
      // let the error handler layer handle this
      throw error
    }
  }

  async createComments(createCommentDto: CreateCommentsDto) {
    const { postId, sender, reception, date, content } = createCommentDto
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const newComment = new this.commentModel({ ...createCommentDto })
    await newComment.save();
    post.comments.push(newComment._id as string);
    await post.save();
    return;
  }

  async generateCommentInfo(commentId: string[]): Promise<CommentDocument>
  async generateCommentInfo(commentId: string): Promise<CommentDocument[]>
  async generateCommentInfo(commentId: string | string[]): Promise<CommentDocument | CommentDocument[]> {
    try {
      const commentIds = Array.isArray(commentId) ? commentId : [commentId]
      const promises = commentIds.map(async (id) => {
        const comment = await this.commentModel.findById(id).lean() as CommentDocument
        const sender = await this.userModel.findById(comment.sender).lean().exec() as UserDocument
        const senderInfo = {
          avatar: sender.avatar,
          userName: sender.userName,
          userId: sender._id.toString()
        }
        return {
          ...comment,
          senderInfo
        }
      })
      return await Promise.all(promises)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


}