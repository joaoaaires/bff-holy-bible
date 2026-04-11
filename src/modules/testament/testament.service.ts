import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestamentService {
  constructor(private readonly prisma: PrismaService) {}

  async readAll() {
    return await this.prisma.testament.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        books: {
          select: {
            id: true,
            order: true,
            name: true,
          },
        },
      },
    });
  }
}
