import { PrismaService } from 'src/prisma/prisma.service';
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
}
