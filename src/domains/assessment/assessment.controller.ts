import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { CheckTranslationDto } from './dto/check-translation.dto';
import { CurrentUser } from 'src/domains/auth/decorators/current-user.decorator';
import { AuthUser } from 'src/domains/auth/decorators/auth-user.decorator';
import { AssessmentStartRdo } from './rdo/assessment-start.rdo';
import { TranslationCheckRdo } from './rdo/translation-check.rdo';
import { AssessmentResultRdo } from './rdo/assessment-result.rdo';
import { FinishAssessmentDto } from './dto/finish-assessment.dto';
import { UserRdo } from '../users/rdo/user.rdo';

@ApiTags('Определение уровня')
@Controller('assessment')
@AuthUser()
export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {}

  @Post('start')
  @ApiOperation({ summary: 'Начать тест' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AssessmentStartRdo,
  })
  startAssessment(@CurrentUser('id') userId: number): AssessmentStartRdo {
    return this.assessmentService.startAssessment(userId);
  }

  @Post('check')
  @ApiOperation({ summary: 'Проверить перевод' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TranslationCheckRdo,
  })
  async checkTranslation(
    @Body() checkTranslationDto: CheckTranslationDto,
  ): Promise<TranslationCheckRdo> {
    return this.assessmentService.checkTranslation(checkTranslationDto);
  }

  @Post('finish')
  @ApiOperation({ summary: 'Завершить тест' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AssessmentResultRdo,
  })
  finishAssessment(
    @Body() finishAssessmentDto: FinishAssessmentDto,
  ): Promise<AssessmentResultRdo> {
    return this.assessmentService.finishAssessment(
      finishAssessmentDto.sessionId,
    );
  }

  @Post('skip')
  @ApiOperation({ summary: 'Пропустить тестирование и начать с уровня A1' })
  @ApiOkResponse({ type: UserRdo })
  @HttpCode(HttpStatus.NO_CONTENT)
  @AuthUser()
  async skipAssessment(@CurrentUser('id') userId: number) {
    return this.assessmentService.skipAssessment(userId);
  }
}
