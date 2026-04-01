import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerseService {
  constructor(private readonly prisma: PrismaService) {}

  async readOneById(chapterId: number) {
    return await this.prisma.verse.findMany({
      where: {
        chapterId,
      },
      select: {
        id: true,
        number: true,
        text: true,
      },
      orderBy: {
        number: 'asc',
      },
    });
  }
}
