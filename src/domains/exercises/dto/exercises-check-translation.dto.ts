import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExercisesCheckTranslationDto {
  @ApiProperty({
    description: 'Перевод пользователя',
    example: 'Hello, world!',
  })
  @IsString({ message: 'Перевод должен быть строкой' })
  @IsNotEmpty({ message: 'Перевод не может быть пустым' })
  userTranslation: string;
}
