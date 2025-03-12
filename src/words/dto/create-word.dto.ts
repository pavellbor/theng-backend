import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, PartOfSpeech } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateWordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  word: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  definition: string;

  @ApiProperty({ enum: PartOfSpeech })
  @IsEnum(PartOfSpeech)
  @IsNotEmpty()
  partOfSpeech: PartOfSpeech;

  @ApiProperty({ enum: CEFRLevel })
  @IsEnum(CEFRLevel)
  @IsNotEmpty()
  cefrLevel: CEFRLevel;
}
