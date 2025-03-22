import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, GrammarTopic, GrammarTopicCategory } from '@prisma/client';

export class GrammarTopicRdo implements GrammarTopic {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор грамматической темы',
  })
  id: number;

  @ApiProperty({
    example: 'Nouns',
    description: 'Название грамматической темы',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
    example: 'Nouns are words that name people, places, things, or ideas.',
    description: 'Описание грамматической темы',
  })
  description: string | null;

  @ApiProperty({
    enum: GrammarTopicCategory,
    description: 'Категория грамматической темы',
  })
  category: GrammarTopicCategory;

  @ApiProperty({
    enum: CEFRLevel,
    description: 'Уровень английского языка',
  })
  cefrLevel: CEFRLevel;

  @ApiProperty({
    example: new Date(),
    description: 'Дата создания грамматической темы',
  })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: 'Дата обновления грамматической темы',
  })
  updatedAt: Date;

  constructor(partial: Partial<GrammarTopic>) {
    Object.assign(this, partial);
  }
}
