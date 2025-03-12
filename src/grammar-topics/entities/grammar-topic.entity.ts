import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, GrammarTopic, GrammarTopicCategory } from '@prisma/client';

export class GrammarTopicEntity implements GrammarTopic {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: String, required: false, nullable: true })
  description: string | null;

  @ApiProperty({ enum: GrammarTopicCategory })
  category: GrammarTopicCategory;

  @ApiProperty({ enum: CEFRLevel })
  cefrLevel: CEFRLevel;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
