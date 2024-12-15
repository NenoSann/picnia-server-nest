import { Types } from "mongoose"
import { PostListType } from "../../user/user.interface"
import { IsEnum, isNotEmpty, IsNotEmpty, IsString } from "class-validator"

export interface createPostDto {
  imageBuffer: Buffer
  imageType: string
  author: string
  localtion: string
  date: string
  content: string
  orientation: string
  comments?: string[]
}

export class queryUserPostsDto {
  @IsEnum(PostListType) @IsNotEmpty()
  type: PostListType

  @IsString() @IsNotEmpty()
  requestUserId: string
}

export class saveOrLikePostDto {
  @IsEnum(PostListType) @IsNotEmpty()
  target: PostListType

  @IsNotEmpty() @IsString()
  userName: string

  @IsNotEmpty() @IsString()
  postId: string
}
