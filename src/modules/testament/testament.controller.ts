import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@modules/auth/auth.guard';
import { TestamentService } from './testament.service';

@Controller()
export class TestamentController {
  constructor(private readonly testamentService: TestamentService) {}

  @UseGuards(AuthGuard)
  @Get('testament')
  async all() {
    const testaments = await this.testamentService.readAll();
    return testaments;
  }
}
