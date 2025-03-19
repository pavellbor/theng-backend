import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExerciseSessionService {
  constructor(private readonly prismaService: PrismaService) {}

  async startSession(userId: number) {
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
    return this.prismaService.exerciseSession.update({
      where: { id: sessionId, userId, endedAt: null },
      data: { endedAt: new Date() },
    });
  }

  async recordExerciseResult(
    userId: number,
    sessionId: number,
    isCorrect: boolean,
  ) {
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
    return this.prismaService.exerciseSession.findUniqueOrThrow({
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
  }

  async getSessionHistory(
    userId: number,
    { limit = 10, offset = 0 }: { limit: number; offset: number },
  ) {
    return this.prismaService.exerciseSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }
}
