import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ENViRONMENT } from './constants';
import { APP_CONFIG } from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.startAllMicroservices();
  app.enableCors();
  app.use(helmet());
  app.set('trust proxy', true);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  if (APP_CONFIG.env !== ENViRONMENT.DEV) {
    const TopCVSwaggerConfig = new DocumentBuilder()
      .setTitle('Softpos tap 2 phone')
      .setDescription('Softpos tap 2 phone')
      .setVersion('1.0')
      .build();
    const topCVocument = SwaggerModule.createDocument(app, TopCVSwaggerConfig);
    SwaggerModule.setup('swagger-docs', app, topCVocument);
  }
  // app.useGlobalInterceptors(new DefaultInterceptor() as any);
  await app.listen(APP_CONFIG.port || 4050);
  // const app = await NestFactory.create(AppModule);
  // await app.listen(8085);
}
bootstrap();
