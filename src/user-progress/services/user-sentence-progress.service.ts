import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserSentenceProgressService {
  constructor(private prismaService: PrismaService) {}

  async saveUserProgress(
    userId: number,
    sentenceId: number,
    isCorrect: boolean,
  ) {
    const existingUserProgress =
      await this.prismaService.userSentenceProgress.findUnique({
        where: {
          userId_sentenceId: { userId, sentenceId },
        },
      });

    if (existingUserProgress) {
      return this.prismaService.userSentenceProgress.update({
        where: {
          userId_sentenceId: { userId, sentenceId },
        },
        data: {
          isCorrect: isCorrect,
          lastStudied: new Date(),
        },
      });
    } else {
      return this.prismaService.userSentenceProgress.create({
        data: {
          userId: userId,
          sentenceId: sentenceId,
          isCorrect: isCorrect,
          lastStudied: new Date(),
        },
      });
    }
  }
}
