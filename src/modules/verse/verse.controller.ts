import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { VerseService } from './verse.service';
import { AuthGuard } from '@modules/auth/auth.guard';

@ApiTags('Versículo')
@ApiBearerAuth('JWT-auth')
@Controller('verse')
export class VerseController {
  constructor(private readonly verseService: VerseService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Consultar versículos por capítulo' })
  @ApiQuery({
    name: 'chapterId',
    required: false,
    description:
      'Identificador numérico do capítulo. Se inválido ou omitido, o comportamento segue a implementação atual do serviço.',
    example: '1',
  })
  @ApiOkResponse({
    description: 'Lista de versículos do capítulo informado.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido ou expirado.',
  })
  async oneById(@Query('chapterId') chapterId: string) {
    const chapterIdNumber = parseInt(chapterId, 0);
    const chapterIdValidate = Number.isNaN(chapterIdNumber)
      ? 0
      : chapterIdNumber;
    const verses = await this.verseService.readOneById(chapterIdValidate);
    return verses;
  }
}
