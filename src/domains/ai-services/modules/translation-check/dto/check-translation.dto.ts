import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CheckTranslationParams } from '../interfaces/check-translation-params.interface';

export class CheckTranslationDto implements CheckTranslationParams {
  @ApiProperty({
    example: 'Я бегаю каждое утро',
    description: 'Перевод слова на русский язык',
  })
  @IsString({ message: 'Перевод должен быть строкой' })
  @IsNotEmpty({ message: 'Перевод не может быть пустым' })
  russianTranslation: string;

  @ApiProperty({
    example: 'I run every morning',
    description: 'Исходное предложение на английском языке',
  })
  @IsString({ message: 'Предложение должно быть строкой' })
  @IsNotEmpty({ message: 'Предложение не может быть пустым' })
  englishSentence: string;

  @ApiProperty({
    example: 'I run every morning',
    description: 'Перевод пользователя, который нужно проверить',
  })
  @IsString({ message: 'Перевод должен быть строкой' })
  @IsNotEmpty({ message: 'Перевод не может быть пустым' })
  userTranslation: string;

  @ApiProperty({
    example: 'run',
    description: 'Ключевое слово в предложении',
  })
  @IsString({ message: 'Слово должно быть строкой' })
  @IsNotEmpty({ message: 'Слово не может быть пустым' })
  word: string;

  @ApiProperty({
    example: 'Present Simple',
    description: 'Название грамматической темы',
  })
  @IsString({ message: 'Название грамматической темы должно быть строкой' })
  @IsNotEmpty({ message: 'Название грамматической темы не может быть пустым' })
  grammarTopicName: string;

  @ApiProperty({
    enum: CEFRLevel,
    example: 'A1',
    description: 'Уровень сложности по шкале CEFR',
  })
  @IsEnum(CEFRLevel, {
    message: 'Уровень сложности должен быть одним из: A1, A2, B1, B2, C1Plus',
  })
  @IsNotEmpty({ message: 'Уровень сложности не может быть пустым' })
  cefrLevel: CEFRLevel;
}
