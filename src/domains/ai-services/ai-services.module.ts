import { Module } from '@nestjs/common';
import { TranslationCheckModule } from './modules/translation-check/translation-check.module';
import { SentenceGenerationModule } from './modules/sentence-generation/sentence-generation.module';

@Module({
  imports: [TranslationCheckModule, SentenceGenerationModule],
  providers: [],
  exports: [TranslationCheckModule, SentenceGenerationModule],
})
export class AiServicesModule {}
