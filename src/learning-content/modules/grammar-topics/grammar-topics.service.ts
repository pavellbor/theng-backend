import { Injectable } from '@nestjs/common';
import { CreateGrammarTopicDto } from './dto/create-grammar-topic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGrammarTopicDto } from './dto/update-grammar-topic.dto';
import { GrammarTopicRdo } from './rdo/grammar-topic.rdo';

@Injectable()
export class GrammarTopicsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createGrammarTopicDto: CreateGrammarTopicDto,
  ): Promise<GrammarTopicRdo> {
    const grammarTopic = await this.prismaService.grammarTopic.create({
      data: createGrammarTopicDto,
    });

    return new GrammarTopicRdo(grammarTopic);
  }

  async findAll(): Promise<GrammarTopicRdo[]> {
    const grammarTopics = await this.prismaService.grammarTopic.findMany();
    return grammarTopics.map(
      (grammarTopic) => new GrammarTopicRdo(grammarTopic),
    );
  }

  async findOne(id: number): Promise<GrammarTopicRdo> {
    const grammarTopic =
      await this.prismaService.grammarTopic.findUniqueOrThrow({
        where: { id },
      });

    return new GrammarTopicRdo(grammarTopic);
  }

  async update(
    id: number,
    updateGrammarTopicDto: UpdateGrammarTopicDto,
  ): Promise<GrammarTopicRdo> {
    const grammarTopic = await this.prismaService.grammarTopic.update({
      where: { id },
      data: updateGrammarTopicDto,
    });

    return new GrammarTopicRdo(grammarTopic);
  }

  async remove(id: number): Promise<GrammarTopicRdo> {
    const grammarTopic = await this.prismaService.grammarTopic.delete({
      where: { id },
    });

    return new GrammarTopicRdo(grammarTopic);
  }
}
