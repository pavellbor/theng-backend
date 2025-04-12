import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, Role, User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

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
    description: 'Уровень обучения пользователя',
    nullable: true,
    required: false,
  })
  @Expose({
    name: 'studyLevel',
  })
  cefrLevel: CEFRLevel | null;

  @ApiProperty({
    enum: CEFRLevel,
    description:
      'Текущий уровень владения языком (на одну ступень ниже уровня обучения)',
    nullable: true,
    required: false,
  })
  @Expose({
    name: 'proficiencyLevel',
  })
  get proficiencyLevel(): CEFRLevel | null {
    if (!this.cefrLevel) return null;

    const levels = Object.values(CEFRLevel);
    const currentIndex = levels.indexOf(this.cefrLevel);

    return currentIndex > 0 ? levels[currentIndex - 1] : CEFRLevel.A0;
  }

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
