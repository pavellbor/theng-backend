import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel } from '@prisma/client';
import { AssessmentLevelStatsWithPercentage } from '../interfaces/assessment-level-stats.interface';
import { AssessmentResult } from '../interfaces/assessment-result.interface';

export class LevelResultRdo implements AssessmentLevelStatsWithPercentage {
  @ApiProperty({
    description: 'Количество попыток на данном уровне',
    example: 3,
  })
  attempts: number;

  @ApiProperty({
    description: 'Количество правильных ответов',
    example: 2,
  })
  correct: number;

  @ApiProperty({
    description: 'Процент правильных ответов',
    example: 67,
  })
  percentage: number;
}

export class AssessmentResultRdo implements AssessmentResult {
  @ApiProperty({
    description: 'Определенный уровень владения языком',
    enum: CEFRLevel,
    example: 'B1',
  })
  determinedLevel: CEFRLevel;

  @ApiProperty({
    description: 'Количество завершенных предложений',
    example: 8,
  })
  completedSentences: number;

  @ApiProperty({
    description: 'Результаты по уровням',
    example: {
      A1: {
        attempts: 2,
        correct: 2,
        percentage: 100,
      },
      A2: {
        attempts: 3,
        correct: 2,
        percentage: 67,
      },
      B1: {
        attempts: 3,
        correct: 2,
        percentage: 67,
      },
    },
  })
  levelStats: Record<CEFRLevel, LevelResultRdo>;
}
