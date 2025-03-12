import { PrismaService } from 'src/prisma/prisma.service';
import { calculateNextReviewDate } from '../utils/calculate-next-review-date';
import { CEFRLevel, Word } from '@prisma/client';
import { getRandomItem } from '../utils/get-random-item';
import { Injectable } from '@nestjs/common';

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

    if (existingUserProgress) {
      return this.prismaService.userWordProgress.update({
        where: {
          userId_wordId: {
            userId,
            wordId,
          },
        },
        data: {
          lastStudied: new Date(),
          reviewCount: isCorrect ? { increment: 1 } : 1, // Сбрасываем на 1 при ошибке, иначе инкремент
          nextReviewDate: calculateNextReviewDate(
            isCorrect ? existingUserProgress.reviewCount + 1 : 1, // Используем 1 для расчета даты при ошибке, иначе инкремент
          ),
        },
      });
    } else {
      return this.prismaService.userWordProgress.create({
        data: {
          userId: userId,
          wordId: wordId,
          lastStudied: new Date(),
          reviewCount: 1,
          nextReviewDate: calculateNextReviewDate(1), // Расчет даты для первого повторения
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
        cefrLevel: cefrLevel, // Use user's CEFR level
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
