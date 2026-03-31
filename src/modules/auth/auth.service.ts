import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { AuthResponse, LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);

    return AuthResponse.fromEntity(user);
  }

  login(loginDto: LoginDto) {
    return loginDto;
  }
}
