import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { SentenceEntity } from './entities/sentence.entity';

@Injectable()
export class SentencesService {
  constructor(private prismaService: PrismaService) {}

  create(createSentenceDto: CreateSentenceDto): Promise<SentenceEntity> {
    return this.prismaService.sentence.create({
      data: createSentenceDto,
    });
  }

  findAll(): Promise<SentenceEntity[]> {
    return this.prismaService.sentence.findMany();
  }

  async findOne(id: number): Promise<SentenceEntity> {
    const sentence = await this.prismaService.sentence.findUnique({
      where: { id },
    });

    if (!sentence) {
      throw new NotFoundException();
    }

    return sentence;
  }

  update(
    id: number,
    updateSentenceDto: UpdateSentenceDto,
  ): Promise<SentenceEntity> {
    return this.prismaService.sentence.update({
      where: { id },
      data: updateSentenceDto,
    });
  }

  remove(id: number): Promise<SentenceEntity> {
    return this.prismaService.sentence.delete({
      where: { id },
    });
  }
}
