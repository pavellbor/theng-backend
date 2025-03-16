import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, PartOfSpeech, Word } from '@prisma/client';

export class WordEntity implements Word {
  @ApiProperty()
  id: number;

  @ApiProperty()
  word: string;

  @ApiProperty()
  russianTranslation: string;

  @ApiProperty({ enum: PartOfSpeech })
  partOfSpeech: PartOfSpeech;

  @ApiProperty({ enum: CEFRLevel })
  cefrLevel: CEFRLevel;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
