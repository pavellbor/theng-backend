import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GenerateSentenceParams } from '../interfaces/generate-sentence-params.interface';

export class GenerateSentenceDto implements GenerateSentenceParams {
  @ApiProperty({
    example: 'run',
    description: 'Слово, для которого нужно создать предложение',
  })
  @IsString({ message: 'Слово должно быть строкой' })
  @IsNotEmpty({ message: 'Слово не может быть пустым' })
  word: string;

  @ApiProperty({
    example: 'verb',
    description: 'Часть речи указанного слова',
  })
  @IsString({ message: 'Часть речи должна быть строкой' })
  @IsNotEmpty({ message: 'Часть речи не может быть пустой' })
  partOfSpeech: string;

  @ApiProperty({
    example: 'бегать',
    description: 'Перевод слова на русский язык',
  })
  @IsString({ message: 'Перевод должен быть строкой' })
  @IsNotEmpty({ message: 'Перевод не может быть пустым' })
  russianTranslation: string;

  @ApiProperty({
    example: 'Present Simple',
    description: 'Грамматическая тема для предложения',
  })
  @IsString({ message: 'Грамматическая тема должна быть строкой' })
  @IsNotEmpty({ message: 'Грамматическая тема не может быть пустой' })
  grammarTopic: string;

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
