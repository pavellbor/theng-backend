import { Injectable } from '@nestjs/common';
import { CheckTranslationDto } from './dto/check-translation.dto';
import { AssessmentSessionService } from './services/assessment-session.service';
import { AssessmentContentService } from './services/assessment-content.service';
import { LevelDeterminationService } from './services/level-determination.service';
import { UsersService } from 'src/domains/users/users.service';
import { AssessmentResult } from './interfaces/assessment-result.interface';
import { TranslationCheck } from './interfaces/translation-check.interface';
import { AssessmentProgress } from './interfaces/assessment-progress.interface';
import { AssessmentStart } from './interfaces/assessment-start.interface';
import { AssessmentSession } from './interfaces/assessment-session.interface';
import { TranslationCheckService } from '../ai-services/modules/translation-check/translation-check.service';
import { CEFRLevel } from '@prisma/client';

@Injectable()
export class AssessmentService {
  private readonly MAX_SENTENCES = 10;

  constructor(
    private readonly translationCheckService: TranslationCheckService,
    private readonly sessionService: AssessmentSessionService,
    private readonly contentService: AssessmentContentService,
    private readonly levelService: LevelDeterminationService,
    private readonly usersService: UsersService,
  ) {}

  startAssessment(userId: number): AssessmentStart {
    const session = this.sessionService.createSession(userId);

    const sentence = this.contentService.getNextSentence(
      session.currentLevel,
      session.usedSentencesIds,
    );

    this.sessionService.setCurrentSentenceId(
      session.id,
      sentence.id,
      sentence.cefrLevel,
    );

    return {
      sessionId: session.id,
      progress: this.getProgress(0),
      sentence,
      isCompleted: session.isCompleted,
    };
  }

  async checkTranslation({
    sessionId,
    userTranslation,
  }: CheckTranslationDto): Promise<TranslationCheck> {
    const session = this.sessionService.getSession(sessionId);

    const sentence = this.contentService.getSentenceById(
      session.currentSentenceId!,
    );

    const checkResult = await this.translationCheckService.checkTranslation({
      englishSentence: sentence.englishSentence,
      russianTranslation: sentence.russianTranslation,
      grammarTopicName: sentence.grammarTopic,
      userTranslation: userTranslation,
      word: sentence.word,
      cefrLevel: sentence.cefrLevel,
    });

    const isCorrect = checkResult.overall.isCorrect;
    const updatedSession = this.sessionService.setAttempt(sessionId, isCorrect);

    if (this.isAssessmentCompleted(updatedSession.completedSentences)) {
      this.sessionService.setIsCompleted(sessionId);

      return {
        isCorrect,
        progress: this.getProgress(updatedSession.completedSentences),
        nextSentence: null,
        feedback: checkResult,
        isCompleted: true,
      };
    }

    const { level, confidence } = this.levelService.determineNextLevel(
      updatedSession,
      isCorrect,
    );

    const updatedSession1 = this.sessionService.setConfidenceScore(
      sessionId,
      confidence,
    );

    console.log(updatedSession1);

    const nextSentence = this.contentService.getNextSentence(
      level,
      updatedSession.usedSentencesIds,
    );

    this.sessionService.setCurrentSentenceId(sessionId, nextSentence.id, level);

    return {
      isCorrect,
      progress: this.getProgress(updatedSession.completedSentences),
      nextSentence: nextSentence,
      feedback: checkResult,
      isCompleted: false,
    };
  }

  async finishAssessment(sessionId: string): Promise<AssessmentResult> {
    const session = this.sessionService.getSession(sessionId);
    const determinedLevel = this.levelService.determineUserLevel(
      session.levelStats,
    );

    await this.usersService.updateCefrLevel(session.userId, determinedLevel);
    this.sessionService.deleteSession(sessionId);

    return {
      determinedLevel,
      completedSentences: session.completedSentences,
      levelStats: this.formatLevelStats(session.levelStats),
    };
  }

  private getProgress(completedSentences: number): AssessmentProgress {
    return {
      completed: completedSentences,
      total: this.MAX_SENTENCES,
      percentage: Math.round((completedSentences / this.MAX_SENTENCES) * 100),
    };
  }

  private isAssessmentCompleted(completedSentences: number): boolean {
    return completedSentences >= this.MAX_SENTENCES;
  }

  private formatLevelStats(
    levelStats: AssessmentSession['levelStats'],
  ): AssessmentResult['levelStats'] {
    const formatted = {} as AssessmentResult['levelStats'];

    Object.entries(levelStats).forEach(([level, data]) => {
      if (data.attempts > 0) {
        formatted[level] = {
          attempts: data.attempts,
          correct: data.correct,
          percentage: Math.round((data.correct / data.attempts) * 100),
        };
      }
    });

    return formatted;
  }

  async skipAssessment(userId: number) {
    await this.usersService.updateCefrLevel(userId, CEFRLevel.A1);
  }
}
