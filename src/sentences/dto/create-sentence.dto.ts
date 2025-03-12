import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSentenceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  englishSentence: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  russianTranslation: string;

  @ApiProperty({ enum: CEFRLevel })
  @IsEnum(CEFRLevel)
  @IsString()
  @IsNotEmpty()
  cefrLevel: CEFRLevel;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  grammarTopicId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  wordId: number;
}
