// user.interface.ts

export interface IUser {
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
