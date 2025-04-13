import { ApiProperty } from '@nestjs/swagger';
import { AssessmentSentenceRdo } from './assessment-sentence.rdo';
import { AssessmentProgressRdo } from './assessment-progress.rdo';
import { TranslationCheck } from '../interfaces/translation-check.interface';

class AssessmentTranslationFeedbackRdo {
  @ApiProperty({
    description: 'Правильность перевода',
    example: { isCorrect: true, feedback: 'Правильно' },
  })
  overall: { isCorrect: boolean; feedback: string };

  @ApiProperty({
    description: 'Слово для тестирования',
    example: { isCorrect: true, feedback: 'Правильно' },
  })
  word: { isCorrect: boolean; feedback: string };

  @ApiProperty({
    description: 'Тема грамматики',
    example: { isCorrect: true, feedback: 'Правильно' },
  })
  grammarTopic: { isCorrect: boolean; feedback: string };
}

export class AssessmentTranslationCheckRdo implements TranslationCheck {
  @ApiProperty({
    description: 'Правильность перевода',
    example: true,
  })
  isCorrect: boolean;

  @ApiProperty({
    description: 'Отзыв о переводе',
    type: AssessmentTranslationFeedbackRdo,
  })
  feedback: AssessmentTranslationFeedbackRdo;

  @ApiProperty({
    description: 'Прогресс тестирования',
    type: AssessmentProgressRdo,
  })
  progress: AssessmentProgressRdo;

  @ApiProperty({
    description: 'Предложение для тестирования',
    type: AssessmentSentenceRdo,
  })
  nextSentence: AssessmentSentenceRdo | null;

  @ApiProperty({
    description: 'Флаг завершения теста',
    example: false,
  })
  isCompleted: boolean;
}
