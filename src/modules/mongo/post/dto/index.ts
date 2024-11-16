import { Types } from "mongoose"
import { PostListType } from "../../user/user.interface"

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

export interface queryUserPostsDto {
  type: PostListType
  requestUserId: string | Types.ObjectId
}