import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_CONFIG } from 'config';
import { HealthService, UsersService } from './services';
import { HealthMiddleware } from './middlewares/health.middleware';
import { PingController, UserController } from './controllers';
import { ResponseUtil } from './utils/response.util';
import UserSchema from './schema/users.schema';
import { MODEL_NAMES } from './constants';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(APP_CONFIG.mongoDb.db_topcv_url, {
      retryAttempts: Number.MAX_VALUE,
      retryDelay: 1000,
    }),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])
  ],
  controllers: [AppController, PingController, UserController],
  providers: [AppService, HealthService, ResponseUtil, UsersService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HealthMiddleware).forRoutes('*');
  }
}
