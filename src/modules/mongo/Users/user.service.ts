import { Model } from 'mongoose'
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { IUser } from './user.interface'
import { AuthService } from '@/modules/auth/auth.service'
import { ProviderConstants } from '@/config/constants'
import { LoginUserDto, RegisterUserDto } from './dto';
import { BcryptService } from '@/modules/auth/bcrypt.service'
const { UserModel } = ProviderConstants;

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<IUser>,
    private readonly bcryptService: BcryptService,
    private readonly authService: AuthService,
  ) { }

  // Add your service methods here
  async login(credential: LoginUserDto): Promise<string> {
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
      return token
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async register(credential: RegisterUserDto): Promise<void> {
    try {
      const { email, password, userName } = credential;
      const duplicatedName = await this.userModel.findOne({ userName })
      const duplicatedEmail = await this.userModel.findOne({ email })
      if (duplicatedName || duplicatedEmail) {
        throw new HttpException('user already exist', HttpStatus.BAD_REQUEST)
      }
      const hash = await this.bcryptService.hash(password)
      const user = new this.userModel({ email, password: hash, userName })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


}
