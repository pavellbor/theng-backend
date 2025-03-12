import { ApiProperty } from '@nestjs/swagger';
import { CEFRLevel, Role, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: String, required: false, nullable: true })
  name: string | null;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: String, required: false, default: CEFRLevel.A1 })
  cefrLevel: CEFRLevel;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
