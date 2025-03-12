import { PrismaService } from 'src/prisma/prisma.service';
import { calculateNextReviewDate } from '../utils/calculate-next-review-date';
import { CEFRLevel, GrammarTopic } from '@prisma/client';
import { getRandomItem } from '../utils/get-random-item';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserGrammarTopicProgressService {
  constructor(private prismaService: PrismaService) {}

  async saveUserProgress(
    userId: number,
    grammarTopicId: number,
    isCorrect: boolean,
  ) {
    const existingUserProgress =
      await this.prismaService.userGrammarTopicProgress.findUnique({
        where: {
          userId_grammarTopicId: { userId, grammarTopicId },
        },
      });

    if (existingUserProgress) {
      return this.prismaService.userGrammarTopicProgress.update({
        where: {
          userId_grammarTopicId: { userId, grammarTopicId },
        },
        data: {
          lastStudied: new Date(), // Обновляем дату
          reviewCount: isCorrect ? { increment: 1 } : 1, // Сбрасываем на 1 при ошибке, иначе инкремент
          nextReviewDate: calculateNextReviewDate(
            isCorrect ? existingUserProgress.reviewCount + 1 : 1, // Используем 1 для расчета даты при ошибке, иначе инкремент
          ),
        },
      });
    } else {
      return this.prismaService.userGrammarTopicProgress.create({
        data: {
          userId: userId,
          grammarTopicId: grammarTopicId,
          lastStudied: new Date(),
          reviewCount: 1,
          nextReviewDate: calculateNextReviewDate(1), // Расчет даты для первого повторения
        },
      });
    }
  }

  async getTopicForReviewOrNew(
    userId: number,
    cefrLevel: CEFRLevel,
  ): Promise<GrammarTopic | null> {
    const topicFromProgress = await this.getReviewDueGrammarTopic(userId);

    if (topicFromProgress) {
      return topicFromProgress;
    }

    return this.getNewGrammarTopicForUser(userId, cefrLevel);
  }

  private async getReviewDueGrammarTopic(userId: number) {
    const now = new Date();

    const progressItemsReadyForReview =
      await this.prismaService.userGrammarTopicProgress.findMany({
        where: {
          userId,
          nextReviewDate: {
            lte: now,
          },
        },
        include: {
          grammarTopic: true,
        },
      });

    if (progressItemsReadyForReview.length) {
      const randomProgressItem = getRandomItem(progressItemsReadyForReview);
      return randomProgressItem.grammarTopic;
    }

    return null;
  }

  private async getNewGrammarTopicForUser(
    userId: number,
    cefrLevel: CEFRLevel,
  ): Promise<GrammarTopic | null> {
    const availableTopicsForLevel =
      await this.prismaService.grammarTopic.findMany({
        where: {
          cefrLevel, // Use user's CEFR level
          NOT: {
            userGrammarTopicProgress: {
              some: {
                userId: userId,
              },
            },
          },
        },
      });

    if (availableTopicsForLevel.length > 0) {
      return getRandomItem(availableTopicsForLevel);
    }

    return null;
  }
}
