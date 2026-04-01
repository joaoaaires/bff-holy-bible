import { Controller, Get } from '@nestjs/common';
import { TestamentService } from './testament.service';

@Controller()
export class TestamentController {
  constructor(private readonly testamentService: TestamentService) {}

  @Get('testament')
  async all() {
    const testaments = await this.testamentService.readAll();
    return testaments;
  }
}
