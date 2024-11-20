import { Document } from 'mongoose';
import { IsString, IsNotEmpty, IsDateString, IsNumber, IsArray, IsBoolean } from 'class-validator';
export interface IPost extends Document {
  image?: string;
  author?: string;
  location?: string;
  date?: Date;
  content: string;
  comments?: string[];
  likes?: number;
  saves?: number;
  commentsCount?: number;
  isInvalid?: boolean;
}

export class PostDto extends Document {
  @IsString() @IsNotEmpty()
  image: string

  @IsString() @IsNotEmpty()
  author: string

  @IsString() @IsNotEmpty()
  location: string

  @IsDateString() @IsNotEmpty()
  date: Date

  @IsString() @IsNotEmpty()
  content: string

  @IsArray() @IsString({ each: true })
  comments: string[]

  @IsNumber() @IsNotEmpty()
  likes: number

  @IsNumber() @IsNotEmpty()
  saves: number

  @IsNumber() @IsNotEmpty()
  commentsCount: number

  @IsBoolean() @IsNotEmpty()
  isInvalid: boolean
}

export class randomQueryDto {
  @IsNumber() @IsNotEmpty()
  count: number

  @IsString() @IsNotEmpty()
  requestUserName: string
}