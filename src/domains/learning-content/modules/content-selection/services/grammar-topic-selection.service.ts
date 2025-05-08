import { Injectable } from '@nestjs/common';
import { CEFRLevel, GrammarTopic } from '@prisma/client';
import { ContentSelectionService } from './content-selection.abstract';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { getRandomItems } from '../utils/get-random-item';

@Injectable()
export class GrammarTopicSelectionService extends ContentSelectionService<GrammarTopic> {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async getReviewDue(userId: number, count: number): Promise<GrammarTopic[]> {
    const progressItems =
      await this.prismaService.userGrammarTopicProgress.findMany({
        where: {
          userId,
          nextReviewDate: {
            lte: new Date(),
          },
        },
        orderBy: {
          mastery: 'asc',
        },
        include: {
          grammarTopic: true,
        },
        take: count,
      });

    return progressItems.map((item) => item.grammarTopic);
  }

  async getNew(
    userId: number,
    cefrLevel: CEFRLevel,
    count: number,
  ): Promise<GrammarTopic[]> {
    const newGrammarTopics = await this.prismaService.grammarTopic.findMany({
      where: {
        cefrLevel: cefrLevel,
        NOT: {
          userGrammarTopicProgress: {
            some: {
              userId: userId,
            },
          },
        },
      },
    });

    if (newGrammarTopics.length > 0) {
      return getRandomItems(newGrammarTopics, count);
    }

    return [];
  }

  async getExisting(userId: number, count: number): Promise<GrammarTopic[]> {
    const userGrammarTopics =
      await this.prismaService.userGrammarTopicProgress.findMany({
        where: {
          userId,
        },
        include: {
          grammarTopic: true,
        },
        orderBy: {
          mastery: 'asc',
        },
        take: count,
      });

    return userGrammarTopics.map((item) => item.grammarTopic);
  }
}
