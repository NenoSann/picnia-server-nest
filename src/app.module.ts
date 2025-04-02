import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleWare } from './middleware/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { UserModule } from '@/modules/mongo/user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PostModule } from './modules/mongo/post/post.module';
import { CommentModule } from './modules/mongo/comment/comment.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import ResponseWrapperInterceptor from './interceptor/responseWrapper.interceptor';
@Module({
  imports: [UserModule, PostModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseWrapperInterceptor
    }
  ]
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
