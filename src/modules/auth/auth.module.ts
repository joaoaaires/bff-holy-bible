import { Module } from '@nestjs/common';

import { CryptoModule } from 'src/common/crypto/crypto.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CryptoModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
