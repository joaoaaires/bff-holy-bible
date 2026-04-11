import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { PasswordHasherService } from '../../common/crypto/password-hasher.service';
import { UserService } from '../user/user.service';
import { AuthResponseDto, LoginDto, RegisterDto } from './dto';
import { UserUnauthorizedException } from './errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordHasher: PasswordHasherService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);

    const payload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return AuthResponseDto.fromEntity(user, accessToken);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.readOneByEmail(loginDto.email);

    const validation = await this.passwordHasher.verify(
      loginDto.password,
      user.password,
    );
    if (!validation) {
      throw new UserUnauthorizedException();
    }

    const payload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return AuthResponseDto.fromEntity(user, accessToken);
  }

  async getProfile(userId: string) {
    const user = await this.userService.readOneById(userId);
    return AuthResponseDto.fromEntity(user);
  }
}
