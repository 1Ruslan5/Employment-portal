import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from '@app/middleware/auth.middleware';
import { AuthModule } from '@app/auth/auth.module';
import { TaskModule } from '@app/task/task.module';
import { CvModule } from './cv/cv.module';

@Module({
  imports: [UserModule, AuthModule, TaskModule, CvModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path:'*',
      method: RequestMethod.ALL
    })
  }
}
