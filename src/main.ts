import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configuração do class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma o payload no tipo do DTO
      whitelist: true, // remove campos não decorados do DTO
      forbidNonWhitelisted: true, // retorna erro se vier campo extra
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
