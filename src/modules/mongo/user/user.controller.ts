import { Controller, Post, Get, Body, Query } from "@nestjs/common"
import { GetUserProfileDto, RegisterUserDto } from "./dto"
import { UserService } from "./user.service"
import { IUser, UserLoginResult } from "./user.interface"

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async registerUser(@Body() createUserDto: RegisterUserDto): Promise<IUser> {
    return this.userService.register(createUserDto)
  }

  @Post('login')
  async login(@Body() loginUserDto: RegisterUserDto): Promise<UserLoginResult> {
    return this.userService.login(loginUserDto)
  }

  @Get('profile')
  async getProfile(@Query() getProfileDto: GetUserProfileDto) {
    return this.userService.getUserProfileById(getProfileDto)
  }
}