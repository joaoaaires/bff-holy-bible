import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // configuração do class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma o payload no tipo do DTO
      whitelist: true, // remove campos não decorados do DTO
      forbidNonWhitelisted: true, // retorna erro se vier campo extra
    }),
  );

  // configuração da port
  const port = configService.getOrThrow<number>('port');
  await app.listen(port);
}
void bootstrap();
