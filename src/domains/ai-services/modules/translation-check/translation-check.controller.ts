import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TranslationCheckService } from './translation-check.service';
import { CheckTranslationDto } from './dto/check-translation.dto';

@ApiTags('AI сервисы')
@Controller('ai-services/translation-check')
export class TranslationCheckController {
  constructor(
    private readonly translationCheckService: TranslationCheckService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Проверить перевод' })
  checkTranslation(@Body() checkTranslationDto: CheckTranslationDto) {
    return this.translationCheckService.checkTranslation(checkTranslationDto);
  }
}

