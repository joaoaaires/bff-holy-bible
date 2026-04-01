import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@modules/auth/auth.guard';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard)
  @Get()
  async oneById(@Query('id') id: string) {
    const idNumber = parseInt(id, 0);
    const idValidate = Number.isNaN(idNumber) ? 0 : idNumber;
    const books = await this.bookService.readOneById(idValidate);
    return books;
  }
}
