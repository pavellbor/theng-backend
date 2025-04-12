import { AssessmentSession } from '../interfaces/assessment-session.interface';
import { CEFRLevel } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AssessmentSessionService {
  private activeSessions: Map<string, AssessmentSession> = new Map();

  createSession(userId: number): AssessmentSession {
    const sessionId = `assessment_${userId}_${Date.now()}`;

    const levelStats = {} as AssessmentSession['levelStats'];

    Object.values(CEFRLevel).forEach((level) => {
      levelStats[level] = {
        attempts: 0,
        correct: 0,
      };
    });

    const session: AssessmentSession = {
      id: sessionId,
      userId,
      completedSentences: 0,
      levelStats,
      currentLevel: CEFRLevel.A1,
      usedSentencesIds: [],
      isCompleted: false,
      confidenceScore: 0,
    };

    this.activeSessions.set(sessionId, session);

    return session;
  }

  getSession(sessionId: string): AssessmentSession {
    const session = this.activeSessions.get(sessionId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  setConfidenceScore(
    sessionId: string,
    confidenceScore: number,
  ): AssessmentSession {
    this.getSession(sessionId);

    return this.updateSession(sessionId, {
      confidenceScore,
    });
  }

  setIsCompleted(sessionId: string): AssessmentSession {
    this.getSession(sessionId);

    return this.updateSession(sessionId, {
      isCompleted: true,
    });
  }

  setCurrentSentenceId(
    sessionId: string,
    sentenceId: number,
    sentenceCefrLevel: CEFRLevel,
  ): AssessmentSession {
    const session = this.getSession(sessionId);

    return this.updateSession(sessionId, {
      currentSentenceId: sentenceId,
      usedSentencesIds: [...session.usedSentencesIds, sentenceId],
      currentLevel: sentenceCefrLevel,
    });
  }

  setAttempt(sessionId: string, isCorrect: boolean): AssessmentSession {
    const session = this.getSession(sessionId);

    const levelStats = {
      ...session.levelStats,
      [session.currentLevel]: {
        attempts: session.levelStats[session.currentLevel].attempts + 1,
        correct: isCorrect
          ? session.levelStats[session.currentLevel].correct + 1
          : session.levelStats[session.currentLevel].correct,
      },
    };

    return this.updateSession(sessionId, {
      levelStats,
      completedSentences: session.completedSentences + 1,
    });
  }

  deleteSession(sessionId: string): void {
    this.activeSessions.delete(sessionId);
  }

  private updateSession(
    sessionId: string,
    updates: Partial<AssessmentSession>,
  ): AssessmentSession {
    const session = this.getSession(sessionId);
    const updatedSession = { ...session, ...updates };

    this.activeSessions.set(sessionId, updatedSession);

    return updatedSession;
  }
}
