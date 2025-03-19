import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserRdo implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: String, required: false, nullable: true })
  name: string | null;

  @Exclude() // Скрываем пароль из ответов API
  password: string;

  @ApiProperty({ enum: CEFRLevel })
  cefrLevel: CEFRLevel;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  lastActive: Date;

  @ApiProperty()
  dailyGoal: number;

  @ApiProperty()
  streak: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<UserRdo>) {
    Object.assign(this, partial);
  }
}
