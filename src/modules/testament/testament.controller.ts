import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '@modules/auth/auth.guard';
import { TestamentService } from './testament.service';

@ApiTags('Testamento')
@ApiBearerAuth('JWT-auth')
@Controller('testament')
export class TestamentController {
  constructor(private readonly testamentService: TestamentService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar testamentos' })
  @ApiOkResponse({
    description: 'Lista de testamentos (Antigo e Novo, conforme catálogo).',
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido ou expirado.',
  })
  async all() {
    const testaments = await this.testamentService.readAll();
    return testaments;
  }
}
