import { Controller, Post, Get, Body, Query } from "@nestjs/common"
import { GetUserProfileDto, RegisterUserDto } from "./dto"
import { UserService } from "./user.service"

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async registerUser(@Body() createUserDto: RegisterUserDto): Promise<void> {
    return this.userService.register(createUserDto)
  }

  @Post('login')
  async login(@Body() loginUserDto: RegisterUserDto): Promise<string> {
    return this.userService.login(loginUserDto)
  }

  @Get('profile')
  async getProfile(@Query() getProfileDto: GetUserProfileDto) {
    return this.userService.getUserProfileById(getProfileDto)
  }
}