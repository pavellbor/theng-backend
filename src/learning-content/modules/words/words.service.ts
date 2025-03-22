import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Word } from '@prisma/client';

@Injectable()
export class WordsService {
  constructor(private prismaService: PrismaService) {}

  async create(createWordDto: CreateWordDto): Promise<Word> {
    return this.prismaService.word.create({
      data: createWordDto,
    });
  }

  async findAll(): Promise<Word[]> {
    return this.prismaService.word.findMany();
  }

  async findOne(id: number): Promise<Word> {
    return this.prismaService.word.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateWordDto: UpdateWordDto): Promise<Word> {
    return this.prismaService.word.update({
      where: { id },
      data: updateWordDto,
    });
  }

  async remove(id: number): Promise<Word> {
    return this.prismaService.word.delete({
      where: { id },
    });
  }
}
