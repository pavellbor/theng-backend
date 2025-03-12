import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckTranslationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userTranslation: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sentenceId: number;
}
