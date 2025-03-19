import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckTranslationDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  exerciseId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userTranslation: string;
}
