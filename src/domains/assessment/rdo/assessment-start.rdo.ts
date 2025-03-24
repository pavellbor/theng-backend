import { ApiProperty } from '@nestjs/swagger';
import { AssessmentProgressRdo } from './assessment-progress.rdo';
import { AssessmentSentenceRdo } from './assessment-sentence.rdo';

export class AssessmentStartRdo {
  @ApiProperty({
    description: 'Идентификатор сессии',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  sessionId: string;

  @ApiProperty({
    description: 'Прогресс тестирования',
    type: AssessmentProgressRdo,
  })
  progress: AssessmentProgressRdo;

  @ApiProperty({
    description: 'Предложение для тестирования',
    type: AssessmentSentenceRdo,
  })
  sentence: AssessmentSentenceRdo;

  @ApiProperty({
    description: 'Флаг завершения теста',
    example: false,
  })
  isCompleted: boolean;
}
