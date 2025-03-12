import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const dtoWithHashedPassword = await this.addHashedPassword(createUserDto);

    return this.prismaService.user.create({
      data: dtoWithHashedPassword,
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const dtoWithHashedPassword = await this.addHashedPassword(updateUserDto);

    return this.prismaService.user.update({
      where: { id },
      data: dtoWithHashedPassword,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  private async addHashedPassword<T extends CreateUserDto | UpdateUserDto>(
    dto: T,
  ) {
    const userDtoCopy = { ...dto };

    if (userDtoCopy.password) {
      const hashedPassword = await bcrypt.hash(userDtoCopy.password, 10);
      userDtoCopy.password = hashedPassword;
    }

    return userDtoCopy;
  }
}
