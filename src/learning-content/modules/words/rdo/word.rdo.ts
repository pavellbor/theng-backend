import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, PartOfSpeech, Word } from '@prisma/client';

export class WordRdo implements Word {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор слова',
  })
  id: number;

  @ApiProperty({
    example: 'word',
    description: 'Слово на английском языке',
  })
  word: string;

  @ApiProperty({
    example: 'слово',
    description: 'Перевод слова на русском языке',
  })
  russianTranslation: string;

  @ApiProperty({
    enum: PartOfSpeech,
    description: 'Часть речи слова',
  })
  partOfSpeech: PartOfSpeech;

  @ApiProperty({
    enum: CEFRLevel,
    description: 'Уровень английского языка',
  })
  cefrLevel: CEFRLevel;

  @ApiProperty({
    example: new Date(),
    description: 'Дата создания слова',
  })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: 'Дата обновления слова',
  })
  updatedAt: Date;

  constructor(partial: Partial<WordRdo>) {
    Object.assign(this, partial);
  }
}
