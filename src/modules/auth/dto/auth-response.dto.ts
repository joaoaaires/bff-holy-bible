import { Expose, plainToInstance } from 'class-transformer';
import { User } from '../../../generated/prisma/browser';

export class AuthResponse {
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

  static fromEntity(user: User): AuthResponse {
    return plainToInstance(
      AuthResponse,
      { ...user },
      { excludeExtraneousValues: true },
    );
  }
}
