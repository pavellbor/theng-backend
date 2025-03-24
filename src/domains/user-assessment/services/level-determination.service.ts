import { Injectable } from '@nestjs/common';
import { CEFRLevel } from '@prisma/client';
import { AssessmentSession } from '../interfaces/assessment-session.interface';
@Injectable()
export class LevelDeterminationService {
  private readonly SUCCESS_THRESHOLD = 0.75;

  determineNextLevel(currentLevel: CEFRLevel, isCorrect: boolean): CEFRLevel {
    const levels = Object.values(CEFRLevel);
    const currentIndex = levels.indexOf(currentLevel);

    // Если ответ правильный и можно повысить уровень
    if (isCorrect && currentIndex < levels.length - 1) {
      return levels[currentIndex + 1];
    }

    // Если ответ неправильный и можно понизить уровень
    if (!isCorrect && currentIndex > 0) {
      return levels[currentIndex - 1];
    }

    // В остальных случаях остаемся на текущем уровне
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

      if (attempts >= 2 && successRate >= this.SUCCESS_THRESHOLD) {
        return level;
      }
    }

    return CEFRLevel.A1;
  }
}
