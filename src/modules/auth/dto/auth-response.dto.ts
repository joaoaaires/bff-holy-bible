import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

import { UserModel } from '@generated/prisma/models';

export class AuthResponseDto {
  @ApiProperty({ description: 'Identificador único do usuário' })
  @Expose()
  id!: string;

  @ApiProperty({ description: 'Nome do usuário' })
  @Expose()
  name!: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  @Expose()
  email!: string;

  @ApiProperty({
    description: 'Data de criação (ISO 8601)',
    example: '2024-01-15T12:00:00.000Z',
  })
  @Expose()
  createdAt!: string;

  @ApiProperty({
    description: 'Data da última atualização (ISO 8601)',
    example: '2024-01-15T12:00:00.000Z',
  })
  @Expose()
  updatedAt!: string;

  @ApiPropertyOptional({
    description: 'Token JWT (presente em login e registro; omitido no perfil)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
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
