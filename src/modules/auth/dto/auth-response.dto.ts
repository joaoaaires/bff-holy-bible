import { Expose, plainToInstance } from 'class-transformer';

import { UserModel } from '@generated/prisma/models';

export class AuthResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;

  @Expose()
  token?: string;

  static fromEntity(user: UserModel, token?: string): AuthResponseDto {
    return plainToInstance(
      AuthResponseDto,
      { ...user, token },
      { excludeExtraneousValues: true },
    );
  }
}
