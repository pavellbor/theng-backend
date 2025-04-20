import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserProgressService } from 'src/domains/user-progress/user-progress.service';
import { ExerciseSessionService } from './services/exercise-session.service';
import { ExerciseService } from './services/exercise.service';
import { ContentSelectionService } from 'src/domains/learning-content/modules/content-selection/content-selection.service';
import { ensureHasLevel } from '../users/utils/ensure-has-level';
import { HintType } from '../ai-services/modules/translation-check/interfaces/translation-hint.interface';

@Injectable()
export class ExercisesService {
  constructor(
    private userProgressService: UserProgressService,
    private exerciseSessionService: ExerciseSessionService,
    private exerciseService: ExerciseService,
    private contentSelectionService: ContentSelectionService,
  ) {}

  async startSession(user: User) {
    const activeSession = await this.exerciseSessionService.getActiveSession(
      user.id,
    );

    if (activeSession) {
      const session = await this.exerciseSessionService.getSessionDetails(
        user.id,
        activeSession.id,
      );

      const lastExercise = session.exercises.at(-1);
      const isSessionCompleted =
        activeSession.exercisesCompleted >= user.dailyGoal &&
        lastExercise?.lastTranslation;

      return {
        session: activeSession,
        exercise: isSessionCompleted ? null : lastExercise,
        isCompleted: isSessionCompleted,
      };
    }

    const session = await this.exerciseSessionService.startSession(user.id);
    const exercise = await this.getNextExercise(user, session.id);

    return {
      session,
      exercise,
      isCompleted: false,
    };
  }

  async endSession(user: User) {
    const activeSession = await this.exerciseSessionService.getActiveSession(
      user.id,
    );

    if (!activeSession) {
      throw new BadRequestException('Сессия упражнений не найдена');
    }

    return this.exerciseSessionService.endSession(user.id, activeSession.id);
  }

  async checkTranslation(user: User, userTranslation: string) {
    const session = await this.exerciseSessionService.getActiveSession(user.id);

    if (!session) {
      throw new BadRequestException('Сессия упражнений не найдена');
    }

    const sessionDetails = await this.exerciseSessionService.getSessionDetails(
      user.id,
      session.id,
    );

    const exerciseId = sessionDetails.exercises.at(-1)?.id;

    if (!exerciseId) {
      throw new BadRequestException('Упражнение не найдено');
    }

    const { exercise, translationFeedback } =
      await this.exerciseService.checkAnswer(exerciseId, userTranslation);

    const isGrammarCorrect = exercise.usedGrammarHint
      ? false
      : translationFeedback.grammarTopic.isCorrect;

    const isWordCorrect = exercise.usedWordHint
      ? false
      : translationFeedback.word.isCorrect;

    const progressUpdate =
      await this.userProgressService.recordSentencePracticeResult({
        userId: user.id,
        grammarTopicId: exercise.sentence.grammarTopicId,
        wordId: exercise.sentence.wordId,
        isGrammarTopicCorrect: isGrammarCorrect,
        isWordCorrect: isWordCorrect,
      });

    const isCorrect = translationFeedback.overall.isCorrect;

    const updatedSession =
      await this.exerciseSessionService.recordExerciseResult(
        user.id,
        session.id,
        isCorrect,
      );

    if (updatedSession.exercisesCompleted >= user.dailyGoal) {
      return {
        session: updatedSession,
        isCorrect,
        feedback: translationFeedback,
        levelUp: progressUpdate.userCefrLevelUpdated,
        newCefrLevel: progressUpdate.newCefrLevel,
        isCompleted: true,
        exercise: null,
      };
    }

    const nextExercise = await this.getNextExercise(user, session.id);

    return {
      session: updatedSession,
      isCorrect,
      feedback: translationFeedback,
      levelUp: progressUpdate.userCefrLevelUpdated,
      newCefrLevel: progressUpdate.newCefrLevel,
      isCompleted: false,
      exercise: nextExercise,
    };
  }

  async getExerciseHistory(userId: number) {
    return this.exerciseService.getExerciseHistory(userId);
  }

  async getSessionHistory(userId: number) {
    return this.exerciseSessionService.getSessionHistory(userId);
  }

  async getSessionDetails(userId: number, sessionId: number) {
    return this.exerciseSessionService.getSessionDetails(userId, sessionId);
  }

  async getTranslationHint(userId: number, hintType: HintType = HintType.BOTH) {
    const session = await this.exerciseSessionService.getActiveSession(userId);

    if (!session) {
      throw new BadRequestException('Сессия упражнений не найдена');
    }

    const sessionDetails = await this.exerciseSessionService.getSessionDetails(
      userId,
      session.id,
    );

    const exerciseId = sessionDetails.exercises.at(-1)?.id;

    if (!exerciseId) {
      throw new BadRequestException('Упражнение не найдено');
    }

    return this.exerciseService.getTranslationHint(exerciseId, hintType);
  }

  private async getNextExercise(user: User, sessionId: number) {
    const userWithCefrLevel = ensureHasLevel(
      user,
      'Пользователь должен пройти тестирование перед началом упражнений',
    );

    const { word, grammarTopic } =
      await this.contentSelectionService.getContentForReview(
        user.id,
        userWithCefrLevel.cefrLevel,
      );

    const exercise = await this.exerciseService.generateExercise(
      sessionId,
      user.id,
      userWithCefrLevel.cefrLevel,
      word,
      grammarTopic,
    );

    return exercise;
  }
}
