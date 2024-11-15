import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthModule } from "@/modules/auth/auth.module";
import { UserController } from "./user.controller";
import { UserProvider } from "./user.provider";
import { MongodModule } from '../mongod.module';

@Module({
  imports: [AuthModule, MongodModule],
  providers: [
    UserProvider,
    UserService
  ],
  controllers: [UserController]
})

export class UserModule {
}