import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Types, Schema } from "mongoose"
import { Document } from 'mongoose';

export interface IComment extends CommentDocument, Document { }

export interface CommentDocument {
  post: string | Schema.Types.ObjectId
  sender: string | Schema.Types.ObjectId
  reception: string | Schema.Types.ObjectId
  date: Schema.Types.Date
  content: string | Schema.Types.String
}


export class QueryCommentsDto {
  @IsString()
  postId: string

  @IsString()
  count: number

  @IsString()
  page: number
}

export class CreateCommentsDto {
  @IsString() @IsNotEmpty()
  postId: string

  @IsString() @IsNotEmpty()
  sender: string

  @IsString() @IsNotEmpty()
  reception: string

  @IsString() @IsNotEmpty()
  content: string

  @IsDate()
  date: Date
}

export interface ICommentsInfo extends IComment {
  senderInfo: {
    avatar: string,
    userName: string,
    userId: string | Types.ObjectId
  },
}