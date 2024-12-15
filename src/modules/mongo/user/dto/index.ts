import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface LoginUserDto {
  readonly email: string;
  readonly password: string;
}

export class RegisterUserDto {
  @IsNotEmpty() @IsString()
  userName: string;
  @IsEmail() @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export interface GetUserPostList {

}

export class GetUserProfileDto {
  @IsString() @IsNotEmpty()
  userName: string
}