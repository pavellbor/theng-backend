import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
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
}
