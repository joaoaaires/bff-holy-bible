import { Injectable } from '@nestjs/common';

import { PasswordHasherService } from '@common/crypto/password-hasher.service';
import { Prisma } from '@generated/prisma/browser';
import { PrismaService } from '../prisma/prisma.service';
import { EmailAlreadyExistsException, UserNotFoundException } from './errors';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordHasherService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
        deletedAt: null,
      },
    });

    if (user) {
      throw new EmailAlreadyExistsException();
    }

    const passwordCrypt = await this.passwordService.hash(
      createUserDto.password,
    );

    const data: Prisma.UserCreateInput = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: passwordCrypt,
    };

    return this.prisma.user.create({
      data,
    });
  }

  async readOneByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async readOneById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
