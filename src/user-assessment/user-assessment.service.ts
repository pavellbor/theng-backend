/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { CEFRLevel } from '@prisma/client';
import { TranslationCheckService } from 'src/exercises/services/translation-check.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as assessmentSentencesData from './data/assessment-sentences.json';
import { CheckTranslationDto } from './dto/check-translation.dto';

interface AssessmentSentence {
  englishSentence: string;
  russianTranslation: string;
  grammarTopic: string;
  word: string;
  cefrLevel: CEFRLevel;
}

interface AssessmentSession {
  userId: number;
  completedSentences: number;
  levelResults: Record<
    CEFRLevel,
    {
      attempts: number;
      correct: number;
    }
  >;
  currentSentenceId?: number;
  currentLevel: CEFRLevel;
  usedSentencesIds: number[];
}

@Injectable()
export class UserAssessmentService {
  private activeSessions: Map<string, AssessmentSession> = new Map();
  private assessmentSentences: AssessmentSentence[] = [];

  private sentencesMap: Map<
    number,
    {
      id: number;
      englishSentence: string;
      russianTranslation: string;
      cefrLevel: CEFRLevel;
      grammarTopic: string;
      word: string;
    }
  > = new Map();

  private readonly SUCCESS_THRESHOLD = 0.7;
  private readonly MAX_SENTENCES = 10;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly translationCheckService: TranslationCheckService,
  ) {
    this.initializeAssessmentSentences();
  }

  startAssessment(userId: number) {
    const sessionId = `assessment_${userId}_${Date.now()}`;

    const levelResults = {} as Record<
      CEFRLevel,
      { attempts: number; correct: number }
    >;

    Object.values(CEFRLevel).forEach((level) => {
      levelResults[level] = {
        attempts: 0,
        correct: 0,
      };
    });

    const session: AssessmentSession = {
      userId,
      completedSentences: 0,
      levelResults,
      currentLevel: CEFRLevel.A2,
      usedSentencesIds: [],
    };

    this.activeSessions.set(sessionId, session);

    const sentence = this.getNextSentence(
      session.currentLevel,
      session.usedSentencesIds,
    );
    session.currentSentenceId = sentence.id;
    session.usedSentencesIds.push(sentence.id);

    return {
      sessionId,
      progress: {
        completed: 0,
        total: this.MAX_SENTENCES,
        percentage: 0,
      },
      sentence: {
        id: sentence.id,
        russianTranslation: sentence.russianTranslation,
        level: sentence.cefrLevel,
      },
    };
  }

  async checkTranslation({
    sessionId,
    sentenceId,
    userTranslation,
  }: CheckTranslationDto) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const sentence = this.sentencesMap.get(sentenceId);

    if (!sentence) {
      throw new Error('Sentence not found');
    }

    const checkResult = await this.translationCheckService.checkTranslation({
      englishSentence: sentence.englishSentence,
      russianTranslation: sentence.russianTranslation,
      grammarTopicName: sentence.grammarTopic,
      userTranslation: userTranslation,
      word: sentence.word,
      cefrLevel: sentence.cefrLevel,
    });

    const isCorrect = checkResult.overall.isCorrect;
    session.levelResults[sentence.cefrLevel].attempts++;
    if (isCorrect) {
      session.levelResults[sentence.cefrLevel].correct++;
    }

    session.completedSentences++;

    if (
      session.completedSentences >= this.MAX_SENTENCES ||
      this.canFinishEarly(session)
    ) {
      return this.finishAssessment(sessionId);
    }

    session.currentLevel = this.determineNextLevel(
      session.currentLevel,
      isCorrect,
    );

    const nextSentence = this.getNextSentence(
      session.currentLevel,
      session.usedSentencesIds,
    );
    session.currentSentenceId = nextSentence.id;
    session.usedSentencesIds.push(nextSentence.id);

    return {
      isCorrect,
      progress: {
        completed: session.completedSentences,
        total: this.MAX_SENTENCES,
        percentage:
          Math.round(session.completedSentences / this.MAX_SENTENCES) * 100,
      },
      sentence: {
        id: nextSentence.id,
        russianTranslation: nextSentence.russianTranslation,
        level: nextSentence.cefrLevel,
      },
      feedback: checkResult,
    };
  }

  private initializeAssessmentSentences() {
    this.assessmentSentences = (assessmentSentencesData as any)
      .assessmentSentences as AssessmentSentence[];

    this.assessmentSentences.forEach((sentence, i) => {
      const id = i + 1;

      this.sentencesMap.set(id, {
        id,
        englishSentence: sentence.englishSentence,
        russianTranslation: sentence.russianTranslation,
        cefrLevel: sentence.cefrLevel,
        grammarTopic: sentence.grammarTopic,
        word: sentence.word,
      });
    });
  }

  private canFinishEarly(session: AssessmentSession): boolean {
    if (session.completedSentences < 5) {
      return false;
    }

    const levels = Object.values(session.levelResults);

    for (const level of levels) {
      const { attempts, correct } = level;

      if (attempts >= 3 && correct / attempts >= 0.8) {
        return true;
      }
    }

    return false;
  }

  private determineNextLevel(
    currentLevel: CEFRLevel,
    isCorrect: boolean,
  ): CEFRLevel {
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

  private async finishAssessment(sessionId: string) {
    // Получаем сессию
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error('Сессия оценки не найдена');
    }

    // Определяем итоговый уровень
    const determinedLevel = this.determineUserLevel(session);

    // Обновляем уровень пользователя
    await this.prismaService.user.update({
      where: { id: session.userId },
      data: { cefrLevel: determinedLevel },
    });

    // Удаляем сессию
    this.activeSessions.delete(sessionId);

    // Формируем результат
    return {
      determinedLevel,
      completedSentences: session.completedSentences,
      levelResults: this.formatLevelResults(session.levelResults),
    };
  }

  /**
   * Форматирование результатов по уровням
   */
  private formatLevelResults(
    levelResults: Record<CEFRLevel, { attempts: number; correct: number }>,
  ) {
    const formatted = {};

    Object.entries(levelResults).forEach(([level, data]) => {
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

  /**
   * Определение уровня пользователя на основе результатов
   */
  private determineUserLevel(session: AssessmentSession): CEFRLevel {
    const levels = Object.values(CEFRLevel);

    // Проверяем уровни от высшего к низшему
    for (let i = levels.length - 1; i >= 0; i--) {
      const level = levels[i];
      const { attempts, correct } = session.levelResults[level];

      // Если на уровне было минимум 2 попытки и успешность выше порога
      if (attempts >= 2 && correct / attempts >= this.SUCCESS_THRESHOLD) {
        return level;
      }
    }

    // Если не нашли подходящий уровень, возвращаем A1
    return CEFRLevel.A1;
  }

  private getNextSentence(level: CEFRLevel, usedSentencesIds: number[]) {
    const availableSentences = Array.from(this.sentencesMap.values()).filter(
      (sentence) =>
        sentence.cefrLevel === level && !usedSentencesIds.includes(sentence.id),
    );

    const randomIndex = Math.floor(Math.random() * availableSentences.length);
    const sentence = availableSentences[randomIndex];

    if (!sentence) {
      throw new Error('No sentence found for the given level');
    }

    return sentence;
  }
}
