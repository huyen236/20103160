import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_CONFIG } from 'config';
import {
  CompanysService,
  HealthService,
  JobMappingService,
  JobsService,
  UsersService,
} from './services';
import { HealthMiddleware } from './middlewares/health.middleware';
import {
  CompanyController,
  JobController,
  JobMappingController,
  PingController,
  UserController,
} from './controllers';
import { ResponseUtil } from './utils/response.util';
import { MODEL_NAMES } from './constants';
import { JwtService } from '@nestjs/jwt';
import UserSchema from './schema/users.schema';
import JobSchema from './schema/jobs.schema';
import CompanySchema from './schema/company.schema';
import { SendMailService } from './services/send-mail.service';
import JobMappingSchema from './schema/job-mapping.schema';
import UserSessionSchema from './schema/user-session.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(APP_CONFIG.mongoDb.db_topcv_url, {
      retryAttempts: Number.MAX_VALUE,
      retryDelay: 1000,
    }),
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
      { name: 'jobs', schema: JobSchema },
      { name: 'company', schema: CompanySchema },
      { name: 'job-mapping', schema: JobMappingSchema },
      { name: 'user-session', schema: UserSessionSchema },
    ]),
  ],
  controllers: [
    PingController,
    UserController,
    JobController,
    CompanyController,
    JobMappingController
  ],
  providers: [
    HealthService,
    ResponseUtil,
    UsersService,
    JwtService,
    CompanysService,
    JobsService,
    SendMailService,
    JobMappingService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HealthMiddleware).forRoutes('*');
  }
}
