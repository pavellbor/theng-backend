import { Injectable } from '@nestjs/common';
import { CEFRLevel } from '@prisma/client';
import { AssessmentSession } from '../interfaces/assessment-session.interface';
@Injectable()
export class LevelDeterminationService {
  private readonly SUCCESS_THRESHOLD = 0.75;
  private readonly MIN_ATTEMPTS_FOR_DECISION = 2;
  private readonly CONFIDENCE_THRESHOLD = 2;

  determineNextLevel(
    session: AssessmentSession,
    isCorrect: boolean,
  ): {
    level: CEFRLevel;
    confidence: number;
  } {
    const confidence = Math.min(
      Math.max(
        session.confidenceScore + (isCorrect ? 1 : -1),
        -this.CONFIDENCE_THRESHOLD,
      ),
      this.CONFIDENCE_THRESHOLD,
    );

    const levels = Object.values(CEFRLevel);
    const currentIndex = levels.indexOf(session.currentLevel);

    if (
      confidence >= this.CONFIDENCE_THRESHOLD &&
      currentIndex < levels.length - 1
    ) {
      return {
        level: levels[currentIndex + 1],
        confidence: 0,
      };
    }

    if (confidence <= -this.CONFIDENCE_THRESHOLD && currentIndex > 0) {
      return {
        level: levels[currentIndex - 1],
        confidence: 0,
      };
    }

    return { level: session.currentLevel, confidence };
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

    return CEFRLevel.A0;
  }
}
