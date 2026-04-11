import { Module } from '@nestjs/common';

import { CryptoModule } from '../../common/crypto/crypto.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    CryptoModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwtSecret'),
        signOptions: {
          expiresIn: configService.getOrThrow<number>('jwtExpiresIn'),
          issuer: configService.getOrThrow<string>('jwtIssuer'),
          audience: configService.getOrThrow<string>('jwtAudience'),
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthStrategy, AuthService],
})
export class AuthModule {}
