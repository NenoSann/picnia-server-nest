import { Document } from 'mongoose';

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