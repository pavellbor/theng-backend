import { Injectable } from '@nestjs/common';
import { CEFRLevel } from '@prisma/client';
import { ensureHasLevel } from 'src/domains/users/utils/ensure-has-level';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class CefrLevelUpdateService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkAndUpdateCefrLevel(userId: number): Promise<CEFRLevel | null> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const userWithCefrLevel = ensureHasLevel(user);
    const currentLevel = userWithCefrLevel.cefrLevel;

    if (currentLevel === CEFRLevel.C1Plus) {
      return null;
    }

    const wordProgress = await this.prismaService.userWordProgress.count({
      where: {
        userId,
        word: {
          cefrLevel: currentLevel,
        },
        mastery: {
          gt: 0.6,
        },
      },
    });

    const grammarProgress =
      await this.prismaService.userGrammarTopicProgress.count({
        where: {
          userId,
          grammarTopic: {
            cefrLevel: currentLevel,
          },
          mastery: {
            gt: 0.6,
          },
        },
      });

    const totalWords = await this.prismaService.word.count({
      where: {
        cefrLevel: currentLevel,
      },
    });

    const totalGrammar = await this.prismaService.grammarTopic.count({
      where: {
        cefrLevel: currentLevel,
      },
    });

    const wordProgressRate = wordProgress / totalWords;
    const grammarProgressRate = grammarProgress / totalGrammar;

    if (wordProgressRate === 1 && grammarProgressRate === 1) {
      const nextLevel = this.getNextLevel(currentLevel);

      if (nextLevel) {
        await this.prismaService.user.update({
          where: { id: userId },
          data: { cefrLevel: nextLevel },
        });

        return nextLevel;
      }
    }

    return null;
  }

  private getNextLevel(currentLevel: CEFRLevel): CEFRLevel | null {
    const levels = [
      CEFRLevel.A0,
      CEFRLevel.A1,
      CEFRLevel.A2,
      CEFRLevel.B1,
      CEFRLevel.B2,
      CEFRLevel.C1Plus,
    ];

    const currentIndex = levels.indexOf(currentLevel);

    if (currentIndex < levels.length - 1) {
      return levels[currentIndex + 1];
    }

    return null;
  }
}
