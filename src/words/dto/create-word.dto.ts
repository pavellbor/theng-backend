import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, PartOfSpeech } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateWordDto {
  @ApiProperty({
    example: 'word',
    description: 'Слово на английском языке',
  })
  @IsString({ message: 'Слово должно быть строкой' })
  @IsNotEmpty({ message: 'Слово не может быть пустым' })
  word: string;

  @ApiProperty({
    example: 'слово',
    description: 'Перевод слова на русском языке',
  })
  @IsString({ message: 'Перевод должен быть строкой' })
  @IsNotEmpty({ message: 'Перевод не может быть пустым' })
  russianTranslation: string;

  @ApiProperty({
    enum: PartOfSpeech,
    description: 'Часть речи слова',
  })
  @IsEnum(PartOfSpeech, {
    message:
      'Часть речи должна быть одной из: NOUN, VERB, ADJECTIVE, ADVERB, PRONOUN, PREPOSITION, CONJUNCTION, INTERJECTION, ARTICLE, NUMERAL, ADVERBIAL, PARTICLE',
  })
  @IsNotEmpty({ message: 'Часть речи не может быть пустой' })
  partOfSpeech: PartOfSpeech;

  @ApiProperty({
    enum: CEFRLevel,
    description: 'Уровень английского языка',
  })
  @IsEnum(CEFRLevel, {
    message:
      'Уровень английского языка должен быть одним из: A1, A2, B1, B2, C1Plus',
  })
  @IsNotEmpty({ message: 'Уровень английского языка не может быть пустым' })
  cefrLevel: CEFRLevel;
}
