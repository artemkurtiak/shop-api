import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';

import { Environment } from '@shared/variables/environment';

import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const swagger = new DocumentBuilder().setTitle('Shop').setVersion('1.0').build();

  app.use(cookieParser());
  app.setGlobalPrefix(Environment.API_PREFIX);
  app.enableCors({ credentials: true, origin: Environment.ALLOWED_ORIGINS.split(';') });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const swaggerDocument = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup(`${Environment.API_PREFIX}/docs`, app, swaggerDocument);

  await app.listen(Environment.PORT, () => {
    Logger.log(`Api started on port ${Environment.PORT}`);
  });
})();
