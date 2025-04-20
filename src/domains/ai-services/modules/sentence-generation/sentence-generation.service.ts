import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/infrastructure/openai/openai.service';
import { sentenceGenerationPrompt } from './prompts/sentence-generation.prompt';
import { GenerateSentenceDto } from './dto/generate-sentence.dto';
import { GeneratedSentence } from './interfaces/generated-sentence.interface';

@Injectable()
export class SentenceGenerationService {
  constructor(private readonly openaiService: OpenAIService) {}

  async generateSentence(
    params: GenerateSentenceDto,
  ): Promise<GeneratedSentence> {
    const sentence =
      await this.openaiService.createChatCompletion<GeneratedSentence>(
        sentenceGenerationPrompt.render(params),
      );
    return sentence;
  }
}
