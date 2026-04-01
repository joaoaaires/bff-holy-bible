import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { VerseService } from './verse.service';
import { AuthGuard } from '@modules/auth/auth.guard';

@Controller('verse')
export class VerseController {
  constructor(private readonly verseService: VerseService) {}

  @UseGuards(AuthGuard)
  @Get()
  async oneById(@Query('chapterId') chapterId: string) {
    const chapterIdNumber = parseInt(chapterId, 0);
    const chapterIdValidate = Number.isNaN(chapterIdNumber)
      ? 0
      : chapterIdNumber;
    const verses = await this.verseService.readOneById(chapterIdValidate);
    return verses;
  }
}
