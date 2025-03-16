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

    const newWord = await this.getNewWordForUser(userId, cefrLevel);
    if (newWord) {
      return newWord;
    }

    const nextLevelWord = await this.getWordFromNextLevel(userId, cefrLevel);
    if (nextLevelWord) {
      return nextLevelWord;
    }

    return this.getExistingWordForUser(userId);
  }

  private async getReviewDueWord(userId: number): Promise<Word | null> {
    const now = new Date();

    const progressItemReadyForReview =
      await this.prismaService.userWordProgress.findFirst({
        where: {
          userId,
          nextReviewDate: {
            lte: now,
          },
        },
        orderBy: {
          mastery: 'asc',
        },
        include: {
          word: true,
        },
      });

    if (progressItemReadyForReview) {
      return progressItemReadyForReview.word;
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

  private async getWordFromNextLevel(userId: number, cefrLevel: CEFRLevel) {
    const cefrLevels = Object.values(CEFRLevel);
    const currentLevelIndex = cefrLevels.indexOf(cefrLevel);

    if (currentLevelIndex >= cefrLevels.length - 1) {
      return null;
    }

    const nextLevel = cefrLevels[currentLevelIndex + 1];
    return this.getNewWordForUser(userId, nextLevel);
  }

  private async getExistingWordForUser(userId: number): Promise<Word | null> {
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
