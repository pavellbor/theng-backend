import { Injectable } from '@nestjs/common';
import { CEFRLevel, Word } from '@prisma/client';
import { ContentSelectionService } from './content-selection.abstract';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { getRandomItem } from '../../../utils/get-random-item';
import { calculateNextLevel } from '../../../utils/calculate-next-level';

@Injectable()
export class WordSelectionService extends ContentSelectionService<Word> {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async getReviewDue(userId: number): Promise<Word | null> {
    const progressItem = await this.prismaService.userWordProgress.findFirst({
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
    });

    return progressItem?.word ?? null;
  }

  async getNew(userId: number, cefrLevel: CEFRLevel): Promise<Word | null> {
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
      return getRandomItem(newWords);
    }

    return null;
  }

  async getNextLevel(
    userId: number,
    cefrLevel: CEFRLevel,
  ): Promise<Word | null> {
    const nextLevel = calculateNextLevel(cefrLevel);

    if (!nextLevel) {
      return null;
    }

    return this.getNew(userId, nextLevel);
  }

  async getExisting(userId: number): Promise<Word | null> {
    const userWord = await this.prismaService.userWordProgress.findFirst({
      where: {
        userId,
      },
      include: {
        word: true,
      },
      orderBy: {
        mastery: 'asc',
      },
    });

    return userWord?.word ?? null;
  }
}
