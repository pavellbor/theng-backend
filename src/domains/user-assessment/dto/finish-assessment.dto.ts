import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FinishAssessmentDto {
  @ApiProperty({
    description: 'Идентификатор сессии',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'sessionId должен быть строкой' })
  @IsNotEmpty({ message: 'sessionId не может быть пустым' })
  sessionId: string;
}
