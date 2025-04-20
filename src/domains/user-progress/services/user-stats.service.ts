import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { User } from '@prisma/client';
import { getNextLevel } from '../utils/get-next-level';
import { getPercentage } from '../utils/get-percentage';
import * as dayjs from 'dayjs';

const MASTERY_THRESHOLD = 0.8;
const MIN_REVIEW_COUNT = 3;

@Injectable()
export class UserStatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserLearningStatsAndProgress(user: User) {
    const [progress, stats] = await Promise.all([
      this.getUserProgressStats(user),
      this.getUserLearningStats(user),
    ]);

    return { progress, stats };
  }

  private getMasteredItemsQuery(userId: number) {
    return {
      userId,
      mastery: {
        gte: MASTERY_THRESHOLD,
      },
      reviewCount: {
        gte: MIN_REVIEW_COUNT,
      },
    };
  }

  private getInProgressItemsQuery(userId: number) {
    return {
      userId,
      OR: [
        {
          mastery: {
            lt: MASTERY_THRESHOLD,
          },
        },
        {
          reviewCount: {
            lt: MIN_REVIEW_COUNT,
          },
        },
      ],
    };
  }

  private async getUserProgressStats(user: User) {
    const today = dayjs().startOf('day').toDate();

    const userId = user.id;

    const exercisesCompletedToday = await this.prismaService.exercise.count({
      where: {
        userId,
        createdAt: {
          gte: today,
        },
      },
    });

    const wordsMastered = await this.prismaService.userWordProgress.count({
      where: this.getMasteredItemsQuery(userId),
    });

    const wordsInProgress = await this.prismaService.userWordProgress.count({
      where: this.getInProgressItemsQuery(userId),
    });

    const grammarTopicsInProgress =
      await this.prismaService.userGrammarTopicProgress.count({
        where: this.getInProgressItemsQuery(userId),
      });

    const grammarTopicsMastered =
      await this.prismaService.userGrammarTopicProgress.count({
        where: this.getMasteredItemsQuery(userId),
      });

    const totalWords = await this.prismaService.word.count({
      where: {
        cefrLevel: user.cefrLevel!,
      },
    });

    const totalGrammarTopics = await this.prismaService.grammarTopic.count({
      where: {
        cefrLevel: user.cefrLevel!,
      },
    });

    return {
      daily: {
        completed: exercisesCompletedToday,
        total: user.dailyGoal,
        percentage: getPercentage(user.dailyGoal, exercisesCompletedToday),
      },
      streak: await this.calculateStreak(user),
      words: {
        mastered: wordsMastered,
        total: totalWords,
        percentage: getPercentage(totalWords, wordsMastered),
        inProgress: wordsInProgress,
      },
      grammarTopics: {
        mastered: grammarTopicsMastered,
        total: totalGrammarTopics,
        percentage: getPercentage(totalGrammarTopics, grammarTopicsMastered),
        inProgress: grammarTopicsInProgress,
      },
      levelProgress: {
        currentLevel: user.cefrLevel,
        percentage: getPercentage(
          totalWords + totalGrammarTopics,
          wordsMastered + grammarTopicsMastered,
        ),
        nextLevel: getNextLevel(user.cefrLevel!),
      },
    };
  }

  private async calculateStreak(user: User) {
    const exerciseSessions = await this.prismaService.exerciseSession.findMany({
      where: {
        userId: user.id,
        endedAt: {
          not: null,
        },
      },
      orderBy: {
        endedAt: 'desc',
      },
    });

    const exercisesByDay: Record<string, number> = {};

    for (const session of exerciseSessions) {
      const formattedSessionDate = dayjs(session.endedAt).format('YYYY-MM-DD');
      exercisesByDay[formattedSessionDate] =
        (exercisesByDay[formattedSessionDate] || 0) +
        session.exercisesCompleted;
    }

    const successfulDays = Object.entries(exercisesByDay)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, exercisesCompleted]) => exercisesCompleted >= user.dailyGoal)
      .map(([day]) => day)
      .sort((a, b) => dayjs(b).diff(dayjs(a)));

    let streak = 0;

    for (let i = 0; i < successfulDays.length; i++) {
      if (
        dayjs(successfulDays[i]).diff(dayjs(successfulDays[i + 1]), 'day') > 1
      ) {
        break;
      }

      streak++;
    }

    return streak;
  }

  private async getUserLearningStats(user: User) {
    const userId = user.id;

    const totalExercises = await this.prismaService.exercise.count({
      where: {
        userId,
      },
    });

    const totalCorrectExercises = await this.prismaService.exercise.count({
      where: {
        userId,
        isCorrect: true,
      },
    });

    const sessions = await this.prismaService.exerciseSession.findMany({
      where: {
        userId,
        endedAt: {
          not: null,
        },
      },
      orderBy: {
        endedAt: 'desc',
      },
    });

    const totalSessions = sessions.length;
    const totalTimeSpent = sessions.reduce(
      (acc, session) =>
        acc + session.endedAt!.getTime() - session.startedAt.getTime(),
      0,
    );

    const allSessions = await this.prismaService.exerciseSession.findMany({
      where: {
        userId,
      },
      orderBy: {
        startedAt: 'desc',
      },
    });

    return {
      totalExercises,
      totalCorrectExercises,
      accuracy: getPercentage(totalExercises, totalCorrectExercises),
      sessionsCompleted: totalSessions,
      totalTimeSpent: totalTimeSpent / 1000 / 60,
      sessionsHistory: allSessions.map((session) => ({
        date: dayjs(session.startedAt).format('YYYY-MM-DD'),
        exercisesCompleted: session.exercisesCompleted,
      })),
    };
  }
}
