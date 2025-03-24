import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/infrastructure/openai/openai.service';
import { TranslationFeedback } from './interfaces/translation-feedback.interface';
import { translationCheckPrompt } from './prompts/translation-check.prompt';
import { CheckTranslationParams } from './interfaces/check-translation-params.interface';

@Injectable()
export class TranslationCheckService {
  constructor(private readonly openaiService: OpenAIService) {}

  async checkTranslation(
    checkTranslationParams: CheckTranslationParams,
  ): Promise<TranslationFeedback> {
    return this.openaiService.createChatCompletion<TranslationFeedback>(
      translationCheckPrompt.render(checkTranslationParams),
    );
  }
}
