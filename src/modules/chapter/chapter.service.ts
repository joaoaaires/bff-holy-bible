import { Injectable } from '@nestjs/common';

import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class ChapterService {
  constructor(private readonly prisma: PrismaService) {}

  async readOneById(id: number) {
    return await this.prisma.chapter.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        number: true,
        book: {
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
