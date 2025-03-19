import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { UserRdo } from './rdo/user.rdo';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  getMe(user: User): UserRdo {
    return new UserRdo(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserRdo> {
    const dtoWithHashedPassword = await this.addHashedPassword(createUserDto);
    const user = await this.prismaService.user.create({
      data: dtoWithHashedPassword,
    });

    return new UserRdo(user);
  }

  async findAll(): Promise<UserRdo[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => new UserRdo(user));
  }

  async findOne(id: number): Promise<UserRdo> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    return new UserRdo(user);
  }

  async findByEmail(email: string): Promise<UserRdo | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user ? new UserRdo(user) : null;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserRdo> {
    const dtoWithHashedPassword = await this.addHashedPassword(updateUserDto);

    const user = await this.prismaService.user.update({
      where: { id },
      data: dtoWithHashedPassword,
    });

    return new UserRdo(user);
  }

  async remove(id: number): Promise<UserRdo> {
    const user = await this.prismaService.user.delete({
      where: { id },
    });

    return new UserRdo(user);
  }

  async updateLastActive(id: number): Promise<UserRdo> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { lastActive: new Date() },
    });

    return new UserRdo(user);
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
