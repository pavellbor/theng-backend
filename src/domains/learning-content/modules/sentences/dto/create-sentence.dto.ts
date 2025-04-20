import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSentenceDto {
  @ApiProperty({
    description: 'Предложение на английском языке',
    example: 'The quick brown fox jumps over the lazy dog',
  })
  @IsString({ message: 'Предложение должно быть строкой' })
  @IsNotEmpty({ message: 'Предложение не может быть пустым' })
  englishSentence: string;

  @ApiProperty({
    description: 'Перевод предложения на русском языке',
    example: 'Быстрый коричневый лис прыгает через ленивую собаку',
  })
  @IsString({ message: 'Перевод должен быть строкой' })
  @IsNotEmpty({ message: 'Перевод не может быть пустым' })
  russianTranslation: string;

  @ApiProperty({
    description: 'Дословный перевод, показывающий грамматическую структуру',
    example: 'Тот быстрый коричневый лис прыгает через ту ленивую собаку',
    required: false,
  })
  @IsString({ message: 'Дословный перевод должен быть строкой' })
  @IsOptional()
  literalTranslation?: string;

  @ApiProperty({
    enum: CEFRLevel,
    description: 'Уровень сложности предложения',
    example: 'A1',
  })
  @IsEnum(CEFRLevel, {
    message: 'Уровень сложности должен быть одним из CEFRLevel',
  })
  @IsNotEmpty({ message: 'Уровень сложности не может быть пустым' })
  cefrLevel: CEFRLevel;

  @ApiProperty({
    description: 'ID грамматической темы',
    example: 1,
  })
  @IsNumber({}, { message: 'ID грамматической темы должно быть числом' })
  @IsNotEmpty({ message: 'ID грамматической темы не может быть пустым' })
  grammarTopicId: number;

  @ApiProperty({
    description: 'ID слова',
    example: 1,
  })
  @IsNumber({}, { message: 'ID слова должно быть числом' })
  @IsNotEmpty({ message: 'ID слова не может быть пустым' })
  wordId: number;

  @ApiProperty({
    description: 'Подсказка по слову',
    example: 'Используйте английское слово "quick" (быстрый) для описания лиса',
    required: false,
  })
  @IsString({ message: 'Подсказка по слову должна быть строкой' })
  @IsOptional()
  wordHint?: string;

  @ApiProperty({
    description: 'Подсказка по грамматике',
    example: 'Используйте Present Simple для описания регулярных действий',
    required: false,
  })
  @IsString({ message: 'Подсказка по грамматике должна быть строкой' })
  @IsOptional()
  grammarHint?: string;

  @ApiProperty({
    description: 'Общая подсказка по переводу',
    example: 'Обратите внимание на порядок слов в английском предложении',
    required: false,
  })
  @IsString({ message: 'Общая подсказка должна быть строкой' })
  @IsOptional()
  generalHint?: string;
}
