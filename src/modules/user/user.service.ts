import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordHasherService } from 'src/common/crypto/password-hasher.service';
import { CreateUserDto } from './dto';
import { EmailAlreadyExistsException } from './errors';
import { Prisma } from 'src/generated/prisma/browser';

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
}
