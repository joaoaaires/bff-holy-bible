import { Module } from '@nestjs/common';

import { CryptoModule } from '../../common/crypto/crypto.module';
import { UserService } from './user.service';

@Module({
  imports: [CryptoModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
