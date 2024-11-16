import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleWare } from './middleware/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { UserModule } from '@/modules/mongo/user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PostModule } from './modules/mongo/post/post.module';
@Module({
  imports: [UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService, AuthService]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // if (process.env.NODE_ENV !== 'development') {
    //   consumer.apply(AuthMiddleWare)
    //     .exclude('user/login', 'user/register')
    //     .forRoutes('*')
    // }
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
