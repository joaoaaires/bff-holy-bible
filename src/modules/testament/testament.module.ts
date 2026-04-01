import { Module } from '@nestjs/common';
import { TestamentService } from './testament.service';
import { TestamentController } from './testament.controller';

@Module({
  controllers: [TestamentController],
  providers: [TestamentService],
})
export class TestamentModule {}
