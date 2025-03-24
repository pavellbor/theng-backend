import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/infrastructure/openai/openai.service';
import { sentenceGenerationPrompt } from './prompts/sentence-generation.prompt';
import { GenerateSentenceParams } from './interfaces/generate-sentence-params.interface';

@Injectable()
export class SentenceGenerationService {
  constructor(private readonly openaiService: OpenAIService) {}

  async generateSentence(params: GenerateSentenceParams) {
    const sentence = await this.openaiService.createChatCompletion<{
      englishSentence: string;
      russianTranslation: string;
    }>(sentenceGenerationPrompt.render(params));
    return sentence;
  }
}
