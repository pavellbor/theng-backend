import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordsService {
  constructor(private prismaService: PrismaService) {}

  create(createWordDto: CreateWordDto) {
    return this.prismaService.word.create({ data: createWordDto });
  }

  findAll() {
    return this.prismaService.word.findMany();
  }

  findOne(id: number) {
    return this.prismaService.word.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return this.prismaService.word.update({
      where: { id },
      data: updateWordDto,
    });
  }

  remove(id: number) {
    return this.prismaService.word.delete({
      where: { id },
    });
  }
}
