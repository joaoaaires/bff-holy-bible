import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('BFF Holy Bible')
    .setDescription(
      'Backend for Frontend da aplicação Bíblia Sagrada: autenticação e catálogo (testamentos, livros, capítulos e versículos). Documentação em português (Brasil).',
    )
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Token JWT retornado no login ou registro. Envie no cabeçalho Authorization: Bearer seguido do token.',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // configuração da port
  const port = configService.getOrThrow<number>('port');
  await app.listen(port);
}
void bootstrap();
