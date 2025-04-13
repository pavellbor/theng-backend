import { Module } from '@nestjs/common';
import { SentenceGenerationService } from './sentence-generation.service';
import { SentenceGenerationController } from './sentence-generation.controller';

@Module({
  providers: [SentenceGenerationService],
  exports: [SentenceGenerationService],
  controllers: [SentenceGenerationController],
})
export class SentenceGenerationModule {}
