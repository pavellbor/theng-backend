import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserRdo implements User {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор пользователя',
  })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Электронная почта пользователя',
  })
  email: string;

  @ApiProperty({ type: String, required: false, nullable: true })
  name: string | null;

  @Exclude() // Скрываем пароль из ответов API
  password: string;

  @ApiProperty({
    enum: CEFRLevel,
    description: 'Уровень английского языка пользователя',
  })
  cefrLevel: CEFRLevel;

  @ApiProperty({
    enum: Role,
    description: 'Роль пользователя',
  })
  role: Role;

  @ApiProperty({
    example: new Date(),
    description: 'Дата последнего актива пользователя',
  })
  lastActive: Date;

  @ApiProperty({
    example: 10,
    description: 'Целевое количество упражнений в день',
  })
  dailyGoal: number;

  @ApiProperty({
    example: 0,
    description: 'Текущая серия упражнений',
  })
  streak: number;

  @ApiProperty({
    example: new Date(),
    description: 'Дата создания пользователя',
  })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: 'Дата обновления пользователя',
  })
  updatedAt: Date;

  constructor(partial: Partial<UserRdo>) {
    Object.assign(this, partial);
  }
}
