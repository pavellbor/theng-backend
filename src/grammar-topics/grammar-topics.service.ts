import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrammarTopicDto } from './dto/create-grammar-topic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGrammarTopicDto } from './dto/update-grammar-topic.dto';

@Injectable()
export class GrammarTopicsService {
  constructor(private prismaService: PrismaService) {}

  create(createGrammarTopicDto: CreateGrammarTopicDto) {
    return this.prismaService.grammarTopic.create({
      data: createGrammarTopicDto,
    });
  }

  findAll() {
    return this.prismaService.grammarTopic.findMany();
  }

  async findOne(id: number) {
    const grammarTopic = await this.prismaService.grammarTopic.findUnique({
      where: { id },
    });

    if (!grammarTopic) {
      throw new NotFoundException();
    }

    return grammarTopic;
  }

  update(id: number, updateGrammarTopicDto: UpdateGrammarTopicDto) {
    return this.prismaService.grammarTopic.update({
      where: { id },
      data: updateGrammarTopicDto,
    });
  }

  remove(id: number) {
    return this.prismaService.grammarTopic.delete({
      where: { id },
    });
  }
}
