import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CEFRLevel, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const dtoWithHashedPassword = await this.addHashedPassword(createUserDto);

    return this.prismaService.user.create({
      data: dtoWithHashedPassword,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  getMe(user: User): User {
    return user;
  }

  async findOne(id: number): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const dtoWithHashedPassword = await this.addHashedPassword(updateUserDto);

    return this.prismaService.user.update({
      where: { id },
      data: dtoWithHashedPassword,
    });
  }

  async remove(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async updateLastActive(id: number): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: { lastActive: new Date() },
    });
  }

  async updateCefrLevel(id: number, cefrLevel: CEFRLevel): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: { cefrLevel },
    });
  }

  async setInitialLevel(
    userId: number,
    level: CEFRLevel = CEFRLevel.A1,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { cefrLevel: level },
    });
  }

  private async addHashedPassword<T extends CreateUserDto | UpdateUserDto>(
    dto: T,
  ): Promise<T> {
    const userDtoCopy = { ...dto };

    if (userDtoCopy.password) {
      const salt = await bcrypt.genSalt();
      userDtoCopy.password = await bcrypt.hash(userDtoCopy.password, salt);
    }

    return userDtoCopy;
  }
}
