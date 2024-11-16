// user.interface.ts

import { Document } from "mongoose";

export interface IUser extends Document {
  userID: string;
  userName: string;
  email: string;
  password: string;
  avatar?: string;
  avatar_v?: number;
  posts?: string[];
  userBrief?: string;
  likeList?: string[];
  saveList?: string[];
  createDate?: Date;
}

export enum PostListType {
  'like' = '0',
  'save' = '1',
  'own' = '2'
}