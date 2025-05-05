import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/infrastructure/openai/openai.service';
import { sentenceGenerationPrompt } from './prompts/sentence-generation.prompt';
import { GenerateSentenceDto } from './dto/generate-sentence.dto';
import { GeneratedSentence } from './interfaces/generated-sentence.interface';
import { GenerateSentencesDto } from './dto/generate-sentences.dto';

@Injectable()
export class SentenceGenerationService {
  constructor(private readonly openaiService: OpenAIService) {}

  async generateSentence(
    params: GenerateSentenceDto,
  ): Promise<GeneratedSentence> {
    const prompt = sentenceGenerationPrompt.render(params);
    const sentence =
      await this.openaiService.createChatCompletion<GeneratedSentence>(prompt);
    return sentence;
  }

  async generateSentences(
    params: GenerateSentencesDto,
  ): Promise<GeneratedSentence[]> {
    return Promise.all(
      params.payload.map((param) => this.generateSentence(param)),
    );
  }
}
