import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async readOneById(id: number) {
    return await this.prisma.book.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        order: true,
        name: true,
        testament: {
          select: {
            id: true,
            code: true,
            name: true,
            description: true,
          },
        },
        chapters: {
          select: {
            id: true,
            number: true,
          },
        },
      },
    });
  }
}
