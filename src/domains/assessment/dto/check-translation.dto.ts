import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckTranslationDto {
  @ApiProperty({
    description: 'Идентификатор сессии теста',
    example: 'assessment_123_1621234567890',
  })
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @ApiProperty({
    description: 'Перевод пользователя',
    example: 'My name is Anna.',
  })
  @IsNotEmpty()
  @IsString()
  userTranslation: string;
}
