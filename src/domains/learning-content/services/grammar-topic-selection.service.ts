import { Injectable } from '@nestjs/common';
import { CEFRLevel, GrammarTopic } from '@prisma/client';
import { ContentSelectionService } from './content-selection.abstract';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { getRandomItem } from '../utils/get-random-item';
import { calculateNextLevel } from '../utils/calculate-next-level';

@Injectable()
export class GrammarTopicSelectionService extends ContentSelectionService<GrammarTopic> {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async getReviewDue(userId: number): Promise<GrammarTopic | null> {
    const progressItem =
      await this.prismaService.userGrammarTopicProgress.findFirst({
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
      });

    return progressItem?.grammarTopic ?? null;
  }

  async getNew(
    userId: number,
    cefrLevel: CEFRLevel,
  ): Promise<GrammarTopic | null> {
    const newWords = await this.prismaService.grammarTopic.findMany({
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

    if (newWords.length > 0) {
      return getRandomItem(newWords);
    }

    return null;
  }

  async getNextLevel(
    userId: number,
    cefrLevel: CEFRLevel,
  ): Promise<GrammarTopic | null> {
    const nextLevel = calculateNextLevel(cefrLevel);

    if (!nextLevel) {
      return null;
    }

    return this.getNew(userId, nextLevel);
  }

  async getExisting(userId: number): Promise<GrammarTopic | null> {
    const userWord =
      await this.prismaService.userGrammarTopicProgress.findFirst({
        where: {
          userId,
        },
        include: {
          grammarTopic: true,
        },
        orderBy: {
          mastery: 'asc',
        },
      });

    return userWord?.grammarTopic ?? null;
  }
}
