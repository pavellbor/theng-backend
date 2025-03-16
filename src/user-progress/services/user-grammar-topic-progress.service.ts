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

    const newTopic = await this.getNewGrammarTopicForUser(userId, cefrLevel);
    if (newTopic) {
      return newTopic;
    }

    const nextLevelTopic = await this.getTopicFromNextLevel(userId, cefrLevel);
    if (nextLevelTopic) {
      return nextLevelTopic;
    }

    return this.getExistingTopicForUser(userId);
  }

  private async getReviewDueGrammarTopic(userId: number) {
    const now = new Date();

    const progressItemReadyForReview =
      await this.prismaService.userGrammarTopicProgress.findFirst({
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
          grammarTopic: true,
        },
      });

    if (progressItemReadyForReview) {
      return progressItemReadyForReview.grammarTopic;
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

  private async getTopicFromNextLevel(userId: number, cefrLevel: CEFRLevel) {
    const cefrLevels = Object.values(CEFRLevel);
    const currentLevelIndex = cefrLevels.indexOf(cefrLevel);

    if (currentLevelIndex >= cefrLevels.length - 1) {
      return null;
    }

    const nextLevel = cefrLevels[currentLevelIndex + 1];
    return this.getNewGrammarTopicForUser(userId, nextLevel);
  }

  private async getExistingTopicForUser(
    userId: number,
  ): Promise<GrammarTopic | null> {
    const userTopic =
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

    return userTopic?.grammarTopic ?? null;
  }
}
