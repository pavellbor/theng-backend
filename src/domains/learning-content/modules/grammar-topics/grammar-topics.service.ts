import { Injectable } from '@nestjs/common';
import { CreateGrammarTopicDto } from './dto/create-grammar-topic.dto';
import { UpdateGrammarTopicDto } from './dto/update-grammar-topic.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { GrammarTopic } from '@prisma/client';

@Injectable()
export class GrammarTopicsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createGrammarTopicDto: CreateGrammarTopicDto,
  ): Promise<GrammarTopic> {
    return this.prismaService.grammarTopic.create({
      data: createGrammarTopicDto,
    });
  }

  async findAll(): Promise<GrammarTopic[]> {
    return this.prismaService.grammarTopic.findMany();
  }

  async findOne(id: number): Promise<GrammarTopic> {
    return this.prismaService.grammarTopic.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(
    id: number,
    updateGrammarTopicDto: UpdateGrammarTopicDto,
  ): Promise<GrammarTopic> {
    return this.prismaService.grammarTopic.update({
      where: { id },
      data: updateGrammarTopicDto,
    });
  }

  async remove(id: number): Promise<GrammarTopic> {
    return this.prismaService.grammarTopic.delete({
      where: { id },
    });
  }
}
