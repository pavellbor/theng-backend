import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/infrastructure/openai/openai.service';
import { sentenceGenerationPrompt } from './prompts/sentence-generation.prompt';
import { GenerateSentenceDto } from './dto/generate-sentence.dto';

@Injectable()
export class SentenceGenerationService {
  constructor(private readonly openaiService: OpenAIService) {}

  async generateSentence(params: GenerateSentenceDto) {
    const sentence = await this.openaiService.createChatCompletion<{
      englishSentence: string;
      russianTranslation: string;
    }>(sentenceGenerationPrompt.render(params));
    return sentence;
  }
}
