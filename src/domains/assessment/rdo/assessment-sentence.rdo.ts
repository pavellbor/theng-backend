import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel } from '@prisma/client';
import { AssessmentSentenceWithId } from '../interfaces/assessment-sentence.interface';

export class AssessmentSentenceRdo implements AssessmentSentenceWithId {
  @ApiProperty({
    description: 'Идентификатор предложения',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Английский предложение',
    example: 'Sentence for testing',
  })
  englishSentence: string;

  @ApiProperty({
    description: 'Русский перевод предложения',
    example: 'Предложение для тестирования',
  })
  russianTranslation: string;

  @ApiProperty({
    description: 'Уровень сложности предложения',
    example: 'A1',
  })
  cefrLevel: CEFRLevel;

  @ApiProperty({
    description: 'Тема грамматики предложения',
    example: 'Тема грамматики предложения',
  })
  grammarTopic: string;

  @ApiProperty({
    description: 'Слово для тестирования',
    example: 'Слово для тестирования',
  })
  word: string;
}
