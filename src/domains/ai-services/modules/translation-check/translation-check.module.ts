import { Module } from '@nestjs/common';
import { TranslationCheckService } from './translation-check.service';

@Module({
  providers: [TranslationCheckService],
  exports: [TranslationCheckService],
})
export class TranslationCheckModule {}
