import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, GrammarTopicCategory } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateGrammarTopicDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: CEFRLevel })
  @IsEnum(CEFRLevel)
  @IsNotEmpty()
  cefrLevel: CEFRLevel;

  @ApiProperty({ enum: GrammarTopicCategory })
  @IsEnum(GrammarTopicCategory)
  @IsNotEmpty()
  category: GrammarTopicCategory;
}
