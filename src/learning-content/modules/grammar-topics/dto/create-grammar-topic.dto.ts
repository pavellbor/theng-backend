import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, GrammarTopicCategory } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateGrammarTopicDto {
  @ApiProperty({
    example: 'Nouns',
    description: 'Название грамматической темы',
  })
  @IsString({ message: 'Название грамматической темы должно быть строкой' })
  @IsNotEmpty({ message: 'Название грамматической темы не может быть пустым' })
  name: string;

  @ApiProperty({
    example: 'Nouns are words that name people, places, things, or ideas.',
    description: 'Описание грамматической темы',
  })
  @IsString({ message: 'Описание грамматической темы должно быть строкой' })
  @IsNotEmpty({ message: 'Описание грамматической темы не может быть пустым' })
  description: string;

  @ApiProperty({
    enum: CEFRLevel,
    description: 'Уровень английского языка',
  })
  @IsEnum(CEFRLevel, {
    message:
      'Уровень английского языка должен быть одним из перечисленных значений',
  })
  @IsNotEmpty({ message: 'Уровень английского языка не может быть пустым' })
  cefrLevel: CEFRLevel;

  @ApiProperty({
    enum: GrammarTopicCategory,
    description: 'Категория грамматической темы',
  })
  @IsEnum(GrammarTopicCategory, {
    message:
      'Категория грамматической темы должна быть одним из перечисленных значений',
  })
  @IsNotEmpty({
    message: 'Категория грамматической темы не может быть пустой',
  })
  category: GrammarTopicCategory;
}
