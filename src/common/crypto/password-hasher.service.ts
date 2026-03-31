import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHasherService {
  async hash(plain: string): Promise<string> {
    const salt = parseInt(process.env.SALT ?? '10');
    return bcrypt.hash(plain, salt);
  }

  async verify(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
