import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckTranslationDto {
  @ApiProperty({
    description: 'The ID of the assessment session',
    example: 'assessment_123_1621234567890',
  })
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @ApiProperty({
    description: 'The ID of the sentence to translate',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  sentenceId: number;

  @ApiProperty({
    description: "The user's translation of the sentence",
    example: 'My name is Anna.',
  })
  @IsNotEmpty()
  @IsString()
  userTranslation: string;
}
