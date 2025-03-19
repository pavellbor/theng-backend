import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  getMe(user: User): UserEntity {
    return new UserEntity(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const dtoWithHashedPassword = await this.addHashedPassword(createUserDto);
    const user = await this.prismaService.user.create({
      data: dtoWithHashedPassword,
    });

    return new UserEntity(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    return new UserEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });

    return new UserEntity(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const dtoWithHashedPassword = await this.addHashedPassword(updateUserDto);

    const user = await this.prismaService.user.update({
      where: { id },
      data: dtoWithHashedPassword,
    });

    return new UserEntity(user);
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.delete({
      where: { id },
    });

    return new UserEntity(user);
  }

  async updateLastActive(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { lastActive: new Date() },
    });

    return new UserEntity(user);
  }

  private async addHashedPassword<T extends CreateUserDto | UpdateUserDto>(
    dto: T,
  ): Promise<T> {
    const userDtoCopy = { ...dto };

    if (userDtoCopy.password) {
      const hashedPassword = await bcrypt.hash(userDtoCopy.password, 10);
      userDtoCopy.password = hashedPassword;
    }

    return userDtoCopy;
  }
}
