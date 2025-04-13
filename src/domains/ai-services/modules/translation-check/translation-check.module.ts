import { Module } from '@nestjs/common';
import { TranslationCheckService } from './translation-check.service';
import { TranslationCheckController } from './translation-check.controller';

@Module({
  providers: [TranslationCheckService],
  exports: [TranslationCheckService],
  controllers: [TranslationCheckController],
})
export class TranslationCheckModule {}
