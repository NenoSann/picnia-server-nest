import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleWare } from './middleware/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { UserModule } from '@/modules/mongo/Users/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, AuthService]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
      .apply(AuthMiddleWare)
      .exclude('user/login', 'user/register')
      .forRoutes('*')
  }
}
