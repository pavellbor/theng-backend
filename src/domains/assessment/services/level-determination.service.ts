import { Injectable } from '@nestjs/common';
import { CEFRLevel } from '@prisma/client';
import { AssessmentSession } from '../interfaces/assessment-session.interface';
@Injectable()
export class LevelDeterminationService {
  private readonly SUCCESS_THRESHOLD = 0.75;
  private readonly MIN_ATTEMPTS_FOR_DECISION = 2;
  private readonly LEVEL_UP_THRESHOLD = 0.75;
  private readonly LEVEL_DOWN_THRESHOLD = 0.4;

  determineNextLevel(
    session: AssessmentSession,
    isCorrect: boolean,
  ): CEFRLevel {
    const currentLevel = session.currentLevel;
    const levelStats = session.levelStats[currentLevel];

    const totalAttempts = levelStats.attempts + 1;
    const totalCorrect = levelStats.correct + (isCorrect ? 1 : 0);

    const successRate = totalCorrect / totalAttempts;

    const levels = Object.values(CEFRLevel);
    const currentIndex = levels.indexOf(session.currentLevel);

    if (totalAttempts < this.MIN_ATTEMPTS_FOR_DECISION) {
      return currentLevel;
    }

    if (
      successRate >= this.LEVEL_UP_THRESHOLD &&
      currentIndex < levels.length - 1
    ) {
      return levels[currentIndex + 1];
    }

    if (successRate <= this.LEVEL_DOWN_THRESHOLD && currentIndex > 0) {
      return levels[currentIndex - 1];
    }

    return currentLevel;
  }

  determineUserLevel(levelStats: AssessmentSession['levelStats']): CEFRLevel {
    const levelScores = {} as Record<CEFRLevel, number>;

    Object.entries(levelStats).forEach(([level, { attempts, correct }]) => {
      levelScores[level] = attempts > 0 ? correct / attempts : 0;
    });

    const levels = Object.values(CEFRLevel);

    // Проверяем уровни от высшего к низшему
    for (let i = levels.length - 1; i >= 0; i--) {
      const level = levels[i];
      const attempts = levelStats[level].attempts;
      const successRate = levelScores[level];

      if (
        attempts >= this.MIN_ATTEMPTS_FOR_DECISION &&
        successRate >= this.SUCCESS_THRESHOLD
      ) {
        return level;
      }
    }

    return CEFRLevel.A1;
  }
}
