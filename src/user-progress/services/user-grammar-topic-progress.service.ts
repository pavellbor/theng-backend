import { PrismaService } from 'src/prisma/prisma.service';
import { CEFRLevel, GrammarTopic } from '@prisma/client';
import { getRandomItem } from '../utils/get-random-item';
import { Injectable } from '@nestjs/common';
import { calculateProgressUpdate } from '../utils/calculate-progress-update';

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

    const newUserProgress = calculateProgressUpdate(
      existingUserProgress,
      isCorrect,
    );

    if (existingUserProgress) {
      return this.prismaService.userGrammarTopicProgress.update({
        where: {
          userId_grammarTopicId: { userId, grammarTopicId },
        },
        data: newUserProgress,
      });
    } else {
      return this.prismaService.userGrammarTopicProgress.create({
        data: {
          userId: userId,
          grammarTopicId: grammarTopicId,
          ...newUserProgress,
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
          cefrLevel,
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
