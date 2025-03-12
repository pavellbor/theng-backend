import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, PartOfSpeech, Word } from '@prisma/client';

export class WordEntity implements Word {
  @ApiProperty()
  id: number;

  @ApiProperty()
  word: string;

  @ApiProperty()
  definition: string;

  @ApiProperty({ type: String, required: false, nullable: true })
  russianTranslation: string | null;

  @ApiProperty({ enum: PartOfSpeech })
  partOfSpeech: PartOfSpeech;

  @ApiProperty({ enum: CEFRLevel })
  cefrLevel: CEFRLevel;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
