import { Module } from '@nestjs/common';
import { SentenceGenerationService } from './sentence-generation.service';

@Module({
  providers: [SentenceGenerationService],
  exports: [SentenceGenerationService],
})
export class SentenceGenerationModule {}
