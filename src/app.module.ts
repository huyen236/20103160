import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { JwtModule, JwtService } from '@nestjs/jwt';
import UserSchema from './schema/users.schema';
import JobSchema from './schema/jobs.schema';
import CompanySchema from './schema/company.schema';
import { SendMailService } from './services/send-mail.service';
import JobMappingSchema from './schema/job-mapping.schema';
import UserSessionSchema from './schema/user-session.schema';
import { ChecktokenMiddleware } from './middlewares/checktoken.middleware';
import { HashUtil } from './utils/hash.util';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: 'your_secret_key',
      signOptions: { expiresIn: '3600s' },
    }),
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
    JobMappingController,
  ],
  providers: [
    HealthService,
    ResponseUtil,
    UsersService,
    JwtService,
    CompanysService,
    JobsService,
    SendMailService,
    JobMappingService,
    HashUtil,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChecktokenMiddleware).forRoutes(
      { path: 'users/:id', method: RequestMethod.GET },
      { path: 'users/logout', method: RequestMethod.POST },
      {
        path: 'users/update/:id',
        method: RequestMethod.PUT,
      },
      {
        path: 'users/change-password',
        method: RequestMethod.PUT,
      },
      {
        path: 'jobs/register',
        method: RequestMethod.POST,
      },
      {
        path: 'jobs',
        method: RequestMethod.GET,
      },
      {
        path: 'job-mapping',
        method: RequestMethod.GET,
      },
      {
        path: 'job-mapping/applyCV',
        method: RequestMethod.POST,
      },
      {
        path: 'job-mapping/approvalCV',
        method: RequestMethod.GET,
      },
      {
        path: 'companys/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'companys/register',
        method: RequestMethod.POST,
      },
      {
        path: 'companys/update/:id',
        method: RequestMethod.PUT,
      },
    );
    // consumer.apply(HealthMiddleware).forRoutes('*');
  }
}
