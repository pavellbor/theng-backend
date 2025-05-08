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
      const exercises = await this.exerciseSessionService.getExercises(
        user.id,
        activeSession.id,
      );
      const lastExercise = await this.exerciseSessionService.getCurrentExercise(
        user.id,
        activeSession.id,
      );
      const isSessionCompleted =
        activeSession.exercisesCompleted >= exercises.length;

      return {
        session: activeSession,
        exercise: isSessionCompleted ? null : lastExercise,
        isCompleted: isSessionCompleted,
      };
    }

    const session = await this.exerciseSessionService.startSession(user.id);
    await this.generateExercises(user, session.id);
    const currentExercise =
      await this.exerciseSessionService.getCurrentExercise(user.id, session.id);

    return {
      session,
      exercise: currentExercise,
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

    const currentExercise =
      await this.exerciseSessionService.getCurrentExercise(user.id, session.id);

    if (!currentExercise) {
      throw new BadRequestException('Упражнение не найдено');
    }

    const { exercise, translationFeedback } =
      await this.exerciseService.checkAnswer(
        currentExercise.id,
        userTranslation,
      );

    let isGrammarCorrect = translationFeedback.grammarTopic.isCorrect;
    let isWordCorrect = translationFeedback.word.isCorrect;
    let isCorrect = translationFeedback.overall.isCorrect;

    if (exercise.usedGrammarHint) {
      isGrammarCorrect = false;
    }

    if (exercise.usedWordHint) {
      isWordCorrect = false;
    }

    if (exercise.usedTranslationHint) {
      isCorrect = false;
      isWordCorrect = false;
      isGrammarCorrect = false;
    }

    const progressUpdate =
      await this.userProgressService.recordSentencePracticeResult({
        userId: user.id,
        grammarTopicId: exercise.sentence.grammarTopicId,
        wordId: exercise.sentence.wordId,
        isGrammarTopicCorrect: isGrammarCorrect,
        isWordCorrect: isWordCorrect,
      });

    const updatedSession =
      await this.exerciseSessionService.recordExerciseResult(
        user.id,
        session.id,
        isCorrect,
      );

    const exercises = await this.exerciseService.getExercisesBySessionId(
      session.id,
    );

    if (updatedSession.exercisesCompleted >= exercises.length) {
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

    const nextExercise = await this.exerciseSessionService.getCurrentExercise(
      user.id,
      updatedSession.id,
    );

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

    const currentExercise =
      await this.exerciseSessionService.getCurrentExercise(userId, session.id);

    if (!currentExercise) {
      throw new BadRequestException('Упражнение не найдено');
    }

    return this.exerciseService.getTranslationHint(
      currentExercise.id,
      hintType,
    );
  }

  private async generateExercises(user: User, sessionId: number) {
    const userWithCefrLevel = ensureHasLevel(
      user,
      'Пользователь должен пройти тестирование перед началом упражнений',
    );

    const { words, grammarTopics } =
      await this.contentSelectionService.getContentForReview(
        user.id,
        userWithCefrLevel.cefrLevel,
        user.dailyGoal,
      );

    const exercises = await Promise.all(
      words.map((word, index) =>
        this.exerciseService.generateExercise(
          sessionId,
          user.id,
          userWithCefrLevel.cefrLevel,
          word,
          grammarTopics[index],
        ),
      ),
    );

    return exercises;
  }
}
