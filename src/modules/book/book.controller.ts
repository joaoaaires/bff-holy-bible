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
import { BookService } from './book.service';

@ApiTags('Livro')
@ApiBearerAuth('JWT-auth')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Consultar livros por testamento' })
  @ApiQuery({
    name: 'id',
    required: false,
    description:
      'Identificador numérico do testamento. Se inválido ou omitido, o comportamento segue a implementação atual do serviço.',
    example: '1',
  })
  @ApiOkResponse({
    description: 'Lista de livros do testamento informado.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido ou expirado.',
  })
  async oneById(@Query('id') id: string) {
    const idNumber = parseInt(id, 0);
    const idValidate = Number.isNaN(idNumber) ? 0 : idNumber;
    const books = await this.bookService.readOneById(idValidate);
    return books;
  }
}
