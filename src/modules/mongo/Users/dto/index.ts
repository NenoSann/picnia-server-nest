export interface LoginUserDto {
  readonly email: string;
  readonly password: string;
}

export interface RegisterUserDto {
  userName: string;
  email: string;
  password: string;
}
