import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WordRdo } from './rdo/word.rdo';

@Injectable()
export class WordsService {
  constructor(private prismaService: PrismaService) {}

  async create(createWordDto: CreateWordDto): Promise<WordRdo> {
    const word = await this.prismaService.word.create({
      data: createWordDto,
    });

    return new WordRdo(word);
  }

  async findAll(): Promise<WordRdo[]> {
    const words = await this.prismaService.word.findMany();
    return words.map((word) => new WordRdo(word));
  }

  async findOne(id: number): Promise<WordRdo> {
    const word = await this.prismaService.word.findUniqueOrThrow({
      where: { id },
    });

    return new WordRdo(word);
  }

  async update(id: number, updateWordDto: UpdateWordDto): Promise<WordRdo> {
    const word = await this.prismaService.word.update({
      where: { id },
      data: updateWordDto,
    });

    return new WordRdo(word);
  }

  async remove(id: number): Promise<WordRdo> {
    const word = await this.prismaService.word.delete({
      where: { id },
    });

    return new WordRdo(word);
  }
}
