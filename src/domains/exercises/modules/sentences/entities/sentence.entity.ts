import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, Sentence } from '@prisma/client';

export class SentenceEntity implements Sentence {
  @ApiProperty()
  id: number;

  @ApiProperty()
  englishSentence: string;

  @ApiProperty()
  russianTranslation: string;

  @ApiProperty({ enum: CEFRLevel })
  cefrLevel: CEFRLevel;

  @ApiProperty()
  wordId: number;

  @ApiProperty()
  grammarTopicId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
