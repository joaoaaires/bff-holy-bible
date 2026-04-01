import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { loadConfig, loadValidation } from '@config/index';
import { TestamentModule } from '@modules/testament/testament.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
