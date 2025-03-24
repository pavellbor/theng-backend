import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
