import { Model } from 'mongoose'
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { IUser, UserLoginResult, PostListType } from './user.interface'
import { AuthService } from '@/modules/auth/auth.service'
import { GetUserProfileDto, LoginUserDto, RegisterUserDto } from './dto';
import { BcryptService } from '@/modules/auth/bcrypt.service'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<IUser>,
    private readonly bcryptService: BcryptService,
    private readonly authService: AuthService,
  ) { }

  async login(credential: LoginUserDto): Promise<UserLoginResult> {
    try {
      const { email, password } = credential;
      const user = await this.userModel.findOne({ email })
      // check if user exist
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      }
      // check if password is correct
      const isPasswordMatch = await this.bcryptService.compare(password, user.password)
      if (!isPasswordMatch) {
        throw new HttpException('password not match', HttpStatus.UNAUTHORIZED)
      }
      // generate token
      const token = this.authService.createJWT(user._id.toString())
      const { userName, avatar, email: userEmail, id } = user
      return {
        userName,
        userID: id,
        email: userEmail,
        avatar,
        token
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async register(credential: RegisterUserDto): Promise<IUser> {
    try {
      const { email, password, userName } = credential;
      const duplicatedName = await this.userModel.findOne({ userName })
      const duplicatedEmail = await this.userModel.findOne({ email })
      if (duplicatedName || duplicatedEmail) {
        throw new HttpException('user already exist', HttpStatus.BAD_REQUEST)
      }
      const hash = await this.bcryptService.hash(password)
      const user = new this.userModel({ email, password: hash, userName })
      await user.save()
      return user
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getUserProfileById(dto: GetUserProfileDto) {
    try {
      const { userName } = dto
      const user = await this.userModel.findOne({ userName })
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      }
      return this.getUserProfile(user)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  getUserPostList(type: PostListType, targetUser: IUser) {
    switch (type) {
      case PostListType.like:
        return targetUser.likeList
      case PostListType.save:
        return targetUser.saveList
      case PostListType.own:
        return targetUser.posts
      default:
        return []
    }
  }

  getUploaderData(uploader: IUser) {
    return {
      userName: uploader.userName,
      avatar: uploader.avatar,
      userId: uploader._id,
      email: uploader.email
    }
  }

  getUserProfile(user: IUser) {
    const { _id, userName, avatar, email, userBrief, posts, likeList, saveList } = user
    return {
      userId: _id,
      userName: userName,
      avatar: avatar,
      email: email,
      userBrief: userBrief,
      posts: posts,
      likePosts: likeList,
      savedPosts: saveList
    }
  }
}
