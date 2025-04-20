import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ExerciseSession, Exercise } from '@prisma/client';
@Injectable()
export class ExerciseSessionService {
  constructor(private readonly prismaService: PrismaService) {}

  async startSession(userId: number): Promise<ExerciseSession> {
    return this.prismaService.exerciseSession.create({
      data: {
        userId,
        startedAt: new Date(),
      },
    });
  }

  async getActiveSession(userId: number) {
    return this.prismaService.exerciseSession.findFirst({
      where: {
        userId,
        endedAt: null,
      },
    });
  }

  async endSession(userId: number, sessionId: number) {
    const session = await this.prismaService.exerciseSession.update({
      where: { id: sessionId, userId, endedAt: null },
      data: { endedAt: new Date() },
      include: {
        exercises: true,
      },
    });

    return this.addDurationAndAccuracy(session);
  }

  async recordExerciseResult(
    userId: number,
    sessionId: number,
    isCorrect: boolean,
  ): Promise<ExerciseSession> {
    return this.prismaService.exerciseSession.update({
      where: { id: sessionId, userId },
      data: {
        exercisesCompleted: { increment: 1 },
        correctAnswers: { increment: isCorrect ? 1 : 0 },
        incorrectAnswers: { increment: isCorrect ? 0 : 1 },
      },
    });
  }

  async getSessionDetails(userId: number, sessionId: number) {
    const session = await this.prismaService.exerciseSession.findUniqueOrThrow({
      where: { id: sessionId, userId },
      include: {
        exercises: {
          include: {
            sentence: {
              include: {
                word: true,
                grammarTopic: true,
              },
            },
          },
        },
      },
    });

    return this.addDurationAndAccuracy(session);
  }

  getLastExercise(session: ExerciseSession & { exercises: Exercise[] }) {
    return session.exercises
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .at(-1);
  }

  async getSessionHistory(userId: number) {
    return this.prismaService.exerciseSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
    });
  }

  private addDurationAndAccuracy<T extends ExerciseSession>(
    session: T,
  ): T & { duration: number; accuracy: number } {
    const duration = session.endedAt
      ? Math.round(
          (session.endedAt.getTime() - session.startedAt.getTime()) / 1000 / 60,
        )
      : 0;

    const accuracy =
      session.exercisesCompleted > 0
        ? (session.correctAnswers / session.exercisesCompleted) * 100
        : 0;

    return {
      ...session,
      duration,
      accuracy,
    };
  }
}
