import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserSentenceProgressService {
  constructor(private prismaService: PrismaService) {}

  async saveUserProgress(
    userId: number,
    sentenceId: number,
    isCorrect: boolean,
    isGrammarTopicCorrect: boolean,
    isWordCorrect: boolean,
    lastTranslation: string,
  ) {
    const existingUserProgress =
      await this.prismaService.userSentenceProgress.findUnique({
        where: {
          userId_sentenceId: { userId, sentenceId },
        },
      });

    const newUserProgress = {
      isCorrect: isCorrect,
      grammarCorrect: isGrammarTopicCorrect,
      wordCorrect: isWordCorrect,
      lastTranslation: lastTranslation,
      lastStudied: new Date(),
    };

    if (existingUserProgress) {
      return this.prismaService.userSentenceProgress.update({
        where: {
          userId_sentenceId: { userId, sentenceId },
        },
        data: newUserProgress,
      });
    } else {
      return this.prismaService.userSentenceProgress.create({
        data: {
          userId: userId,
          sentenceId: sentenceId,
          ...newUserProgress,
        },
      });
    }
  }
}
