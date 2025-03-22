import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CEFRLevel, Role, User } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

@ApiTags('users')
export class CreateUserDto implements Partial<User> {
  @ApiProperty({
    example: 'test@test.com',
    description: 'Уникальный email пользователя',
  })
  @IsEmail({}, { message: 'Введите корректный email адрес' })
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  @MaxLength(100, { message: 'Email не может быть длиннее 100 символов' })
  email: string;

  @ApiProperty({
    required: false,
    example: 'John Doe',
    description: 'Имя пользователя',
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsOptional()
  @MaxLength(100, { message: 'Имя не может быть длиннее 100 символов' })
  name?: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'Пароль пользователя (мин. 8 символов, должен содержать буквы и цифры)',
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @Length(8, 50, { message: 'Пароль должен содержать от 8 до 50 символов' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]+$/, {
    message: 'Пароль должен содержать минимум одну букву и одну цифру',
  })
  password: string;

  @ApiProperty({
    example: 10,
    description: 'Целевое количество упражнений в день',
  })
  @IsNumber({}, { message: 'Целевое количество упражнений должно быть числом' })
  @IsOptional()
  dailyGoal?: number;

  @ApiProperty({
    example: Role.USER,
    enum: Role,
    description: 'Роль пользователя',
  })
  @IsEnum(Role, {
    message: 'Роль должна быть одной из: USER, ADMIN, MODERATOR',
  })
  @IsOptional()
  role?: Role;

  @ApiProperty({
    example: CEFRLevel.A1,
    enum: CEFRLevel,
    description: 'Уровень английского языка пользователя',
  })
  @IsOptional()
  cefrLevel?: CEFRLevel;
}
