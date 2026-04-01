import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@modules/auth/auth.guard';
import { ChapterService } from './chapter.service';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @UseGuards(AuthGuard)
  @Get()
  async oneById(@Query('id') id: string) {
    const idNumber = parseInt(id, 0);
    const idValidate = Number.isNaN(idNumber) ? 0 : idNumber;
    const chapters = await this.chapterService.readOneById(idValidate);
    return chapters;
  }
}
