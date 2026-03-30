import { Injectable } from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthResponse, LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const input = {
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
    } as Prisma.UserCreateInput;

    const result = await this.prisma.user.create({
      data: input,
    });

    return AuthResponse.fromEntity(result);
  }

  login(loginDto: LoginDto) {
    return loginDto;
  }
}
