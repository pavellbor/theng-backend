import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SentenceGenerationService } from './sentence-generation.service';
import { GenerateSentenceDto } from './dto/generate-sentence.dto';

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
}
