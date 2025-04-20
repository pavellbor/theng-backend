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
    description: 'Дословный перевод, показывающий грамматическую структуру',
    example: 'Тот быстрый коричневый лис прыгает через ту ленивую собаку',
    required: false,
    nullable: true,
  })
  literalTranslation: string | null;

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
    description: 'Подсказка по слову',
    example: 'Используйте английское слово "quick" (быстрый) для описания лиса',
    required: false,
    nullable: true,
  })
  wordHint: string | null;

  @ApiProperty({
    description: 'Подсказка по грамматике',
    example: 'Используйте Present Simple для описания регулярных действий',
    required: false,
    nullable: true,
  })
  grammarHint: string | null;

  @ApiProperty({
    description: 'Общая подсказка по переводу',
    example: 'Обратите внимание на порядок слов в английском предложении',
    required: false,
    nullable: true,
  })
  generalHint: string | null;

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
