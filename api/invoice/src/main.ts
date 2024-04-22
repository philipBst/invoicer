import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { isProd } from './constants/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: !isProd,
      forbidNonWhitelisted: !isProd,
      transform: true,
    }),
  );

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type, Authorization, Accept, x-xsrf-token',
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
