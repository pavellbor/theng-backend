import { Injectable } from '@nestjs/common';
import { CEFRLevel, Word } from '@prisma/client';
import { ContentSelectionService } from './content-selection.abstract';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { getRandomItems } from '../utils/get-random-item';

@Injectable()
export class WordSelectionService extends ContentSelectionService<Word> {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async getReviewDue(userId: number, count: number): Promise<Word[]> {
    const progressItems = await this.prismaService.userWordProgress.findMany({
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
        word: true,
      },
      take: count,
    });

    return progressItems.map((item) => item.word);
  }

  async getNew(
    userId: number,
    cefrLevel: CEFRLevel,
    count: number,
  ): Promise<Word[]> {
    const newWords = await this.prismaService.word.findMany({
      where: {
        cefrLevel: cefrLevel,
        NOT: {
          userWordProgress: {
            some: {
              userId: userId,
            },
          },
        },
      },
    });

    if (newWords.length > 0) {
      return getRandomItems(newWords, count);
    }

    return [];
  }

  async getExisting(userId: number, count: number): Promise<Word[]> {
    const userWords = await this.prismaService.userWordProgress.findMany({
      where: {
        userId,
      },
      include: {
        word: true,
      },
      orderBy: {
        mastery: 'asc',
      },
      take: count,
    });

    return userWords.map((item) => item.word);
  }
}
