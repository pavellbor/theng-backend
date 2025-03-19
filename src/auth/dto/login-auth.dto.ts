import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'Email пользователя',
  })
  @IsEmail({}, { message: 'Введите корректный email адрес' })
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Пароль пользователя',
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  password: string;
}
