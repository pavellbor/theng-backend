import { PrismaService } from 'src/prisma/prisma.service';
import { CEFRLevel, Word } from '@prisma/client';
import { getRandomItem } from '../utils/get-random-item';
import { Injectable } from '@nestjs/common';
import { calculateProgressUpdate } from '../utils/calculate-progress-update';

@Injectable()
export class UserWordProgressService {
  constructor(private prismaService: PrismaService) {}

  async saveUserProgress(userId: number, wordId: number, isCorrect: boolean) {
    const existingUserProgress =
      await this.prismaService.userWordProgress.findUnique({
        where: {
          userId_wordId: {
            userId,
            wordId,
          },
        },
      });

    const newUserProgress = calculateProgressUpdate(
      existingUserProgress,
      isCorrect,
    );

    if (existingUserProgress) {
      return this.prismaService.userWordProgress.update({
        where: {
          userId_wordId: {
            userId,
            wordId,
          },
        },
        data: newUserProgress,
      });
    } else {
      return this.prismaService.userWordProgress.create({
        data: {
          userId: userId,
          wordId: wordId,
          ...newUserProgress,
        },
      });
    }
  }

  async getWordForReviewOrNew(
    userId: number,
    cefrLevel: CEFRLevel,
  ): Promise<Word | null> {
    const wordFromProgress = await this.getReviewDueWord(userId);

    if (wordFromProgress) {
      return wordFromProgress;
    }

    return this.getNewWordForUser(userId, cefrLevel);
  }

  private async getReviewDueWord(userId: number): Promise<Word | null> {
    const now = new Date();

    const progressItemsReadyForReview =
      await this.prismaService.userWordProgress.findMany({
        where: {
          userId,
          nextReviewDate: {
            lte: now,
          },
        },
        include: {
          word: true,
        },
      });

    if (progressItemsReadyForReview.length) {
      const randomWordProgressItem = getRandomItem(progressItemsReadyForReview);
      return randomWordProgressItem.word;
    }

    return null;
  }

  private async getNewWordForUser(
    userId: number,
    cefrLevel: CEFRLevel,
  ): Promise<Word | null> {
    const availableWordsForLevel = await this.prismaService.word.findMany({
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

    if (availableWordsForLevel.length > 0) {
      return getRandomItem(availableWordsForLevel);
    }

    return null;
  }
}
