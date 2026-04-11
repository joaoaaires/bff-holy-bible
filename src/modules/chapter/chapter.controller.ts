import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { ChapterService } from './chapter.service';

@ApiTags('Capítulo')
@ApiBearerAuth('JWT-auth')
@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Consultar capítulos por livro' })
  @ApiQuery({
    name: 'id',
    required: false,
    description:
      'Identificador numérico do livro. Se inválido ou omitido, o comportamento segue a implementação atual do serviço.',
    example: '1',
  })
  @ApiOkResponse({
    description: 'Lista de capítulos do livro informado.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido ou expirado.',
  })
  async oneById(@Query('id') id: string) {
    const idNumber = parseInt(id, 0);
    const idValidate = Number.isNaN(idNumber) ? 0 : idNumber;
    const chapters = await this.chapterService.readOneById(idValidate);
    return chapters;
  }
}
