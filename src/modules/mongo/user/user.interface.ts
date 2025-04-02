// user.interface.ts

import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  userID: string;
  userName: string;
  email: string;
  password: string;
  avatar?: string;
  avatar_v?: number;
  posts?: Array<string | Types.ObjectId>;
  userBrief?: string;
  likeList?: Array<string | Types.ObjectId>;
  saveList?: Array<string | Types.ObjectId>;
  createDate?: Date;
}

export interface UserLoginResult
  extends Pick<
    IUser,
    'userID' | 'userName' | 'email' | 'avatar' | 'createDate'
  > {
  token: string;
}

export interface UserDocument {
  _id: string | {};
  userName: string;
  email: string;
  password: string;
  avatar?: string;
  avatar_v?: number;
  posts?: Array<string | Types.ObjectId>;
  userBrief?: string;
  likeList?: Array<string | Types.ObjectId>;
  saveList?: Array<string | Types.ObjectId>;
  createDate?: Date;
}

export enum PostListType {
  'like' = '0',
  'save' = '1',
  'own' = '2',
}
