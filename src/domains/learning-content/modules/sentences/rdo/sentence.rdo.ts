import { ApiProperty } from '@nestjs/swagger';
import { Sentence, CEFRLevel } from '@prisma/client';

export class SentenceRdo implements Sentence {
  @ApiProperty({
    description: 'ID предложения',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Предложение на английском языке',
    example: 'The quick brown fox jumps over the lazy dog',
  })
  englishSentence: string;

  @ApiProperty({
    description: 'Перевод предложения на русском языке',
    example: 'Быстрый коричневый лис прыгает через ленивую собаку',
  })
  russianTranslation: string;

  @ApiProperty({
    description: 'ID грамматической темы',
    example: 1,
  })
  grammarTopicId: number;

  @ApiProperty({
    description: 'ID слова',
    example: 1,
  })
  wordId: number;

  @ApiProperty({
    description: 'Уровень сложности предложения',
    example: 'A1',
  })
  cefrLevel: CEFRLevel;

  @ApiProperty({
    description: 'Дата создания предложения',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления предложения',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
