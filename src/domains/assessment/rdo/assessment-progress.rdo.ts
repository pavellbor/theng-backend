import { ApiProperty } from '@nestjs/swagger';
import { AssessmentProgress } from '../interfaces/assessment-progress.interface';
export class AssessmentProgressRdo implements AssessmentProgress {
  @ApiProperty({
    description: 'Количество выполненных предложений',
    example: 1,
  })
  completed: number;

  @ApiProperty({
    description: 'Общее количество предложений',
    example: 10,
  })
  total: number;

  @ApiProperty({
    description: 'Процент выполнения',
    example: 10,
  })
  percentage: number;
}
