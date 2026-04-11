import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { loadConfig, loadValidation } from './config';
import { TestamentModule } from './modules/testament/testament.module';
import { BookModule } from './modules/book/book.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { VerseModule } from './modules/verse/verse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
      validate: loadValidation,
      isGlobal: true,
      cache: true,
    }),
    PrismaModule,
    AuthModule,
    TestamentModule,
    BookModule,
    ChapterModule,
    VerseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
