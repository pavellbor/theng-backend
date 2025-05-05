import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SentenceGenerationService } from './sentence-generation.service';
import { GenerateSentenceDto } from './dto/generate-sentence.dto';
import { GenerateSentencesDto } from './dto/generate-sentences.dto';

@ApiTags('AI сервисы')
@Controller('ai-services/sentence-generation')
export class SentenceGenerationController {
  constructor(
    private readonly sentenceGenerationService: SentenceGenerationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Сгенерировать предложение' })
  generateSentence(@Body() generateSentenceDto: GenerateSentenceDto) {
    return this.sentenceGenerationService.generateSentence(generateSentenceDto);
  }

  @Post('sentences')
  @ApiOperation({ summary: 'Сгенерировать предложения' })
  generateSentences(@Body() generateSentencesDto: GenerateSentencesDto) {
    return this.sentenceGenerationService.generateSentences(
      generateSentencesDto,
    );
  }
}
