import { Injectable, BadRequestException } from '@nestjs/common';
import { TranslationCheckService } from './services/translation-check.service';
import { CEFRLevel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SentenceGenerationService } from './services/sentence-generation.service';
import { UserProgressService } from 'src/user-progress/user-progress.service';
import { CheckTranslationDto } from './dto/check-translation.dto';
import { ExerciseSessionService } from './services/exercise-session.service';
import { LearningContentService } from 'src/learning-content/learning-content.service';
@Injectable()
export class ExerciseService {
  constructor(
    private prismaService: PrismaService,
    private sentenceGenerationService: SentenceGenerationService,
    private translationCheckService: TranslationCheckService,
    private userProgressService: UserProgressService,
    private exerciseSessionService: ExerciseSessionService,
    private learningContentService: LearningContentService,
  ) {}

  async startSession(userId: number) {
    const activeSession =
      await this.exerciseSessionService.getActiveSession(userId);

    if (activeSession) {
      throw new BadRequestException('Сессия упражнений уже начата');
    }

    const session = await this.exerciseSessionService.startSession(userId);

    return {
      sessionId: session.id,
      startedAt: session.startedAt,
      message: 'Сессия упражнений успешно начата',
    };
  }

  async endSession(userId: number) {
    const activeSession =
      await this.exerciseSessionService.getActiveSession(userId);

    if (!activeSession) {
      throw new BadRequestException('Сессия упражнений не найдена');
    }

    const session = await this.exerciseSessionService.endSession(
      userId,
      activeSession.id,
    );

    const stats = {
      sessionId: session.id,
      duration: Math.round(
        (session.endedAt!.getTime() - session.startedAt.getTime()) / 1000 / 60,
      ), // продолжительность в минутах
      exercisesCompleted: session.exercisesCompleted,
      correctAnswers: session.correctAnswers,
      incorrectAnswers: session.incorrectAnswers,
      accuracy:
        session.exercisesCompleted > 0
          ? (session.correctAnswers / session.exercisesCompleted) * 100
          : 0,
    };

    return {
      ...stats,
      message: 'Сессия упражнений успешно завершена',
    };
  }

  async getNextExercise(userId: number, cefrLevel: CEFRLevel) {
    const session = await this.exerciseSessionService.getActiveSession(userId);

    if (!session) {
      throw new BadRequestException('Сессия упражнений не найдена');
    }

    const { word, grammarTopic } =
      await this.learningContentService.getContentForReview(userId, cefrLevel);

    const generatedSentence =
      await this.sentenceGenerationService.generateSentence({
        word: word.word,
        partOfSpeech: word.partOfSpeech,
        russianTranslation: word.russianTranslation,
        cefrLevel: cefrLevel,
        grammarTopic: grammarTopic.name,
      });

    const sentence = await this.prismaService.sentence.create({
      data: {
        englishSentence: generatedSentence.englishSentence,
        russianTranslation: generatedSentence.russianTranslation,
        grammarTopicId: grammarTopic.id,
        wordId: word.id,
        cefrLevel: cefrLevel,
      },
      include: {
        grammarTopic: true,
        word: true,
      },
    });

    const exercise = await this.prismaService.exercise.create({
      data: {
        userId,
        sentenceId: sentence.id,
        exerciseSessionId: session.id,
      },
      include: {
        sentence: {
          include: {
            word: true,
            grammarTopic: true,
          },
        },
      },
    });

    return exercise;
  }

  async checkTranslation(
    userId: number,
    checkTranslationDto: CheckTranslationDto,
  ) {
    const { userTranslation, exerciseId } = checkTranslationDto;

    const session = await this.exerciseSessionService.getActiveSession(userId);

    if (!session) {
      throw new BadRequestException('Сессия упражнений не найдена');
    }

    const exercise = await this.prismaService.exercise.findUniqueOrThrow({
      where: {
        id: exerciseId,
        userId,
      },
      include: {
        sentence: {
          include: {
            grammarTopic: true,
            word: true,
          },
        },
      },
    });

    const checkResult = await this.translationCheckService.checkTranslation({
      englishSentence: exercise.sentence.englishSentence,
      russianTranslation: exercise.sentence.russianTranslation,
      grammarTopicName: exercise.sentence.grammarTopic.name,
      word: exercise.sentence.word.russianTranslation,
      userTranslation: userTranslation,
      cefrLevel: exercise.sentence.cefrLevel,
    });

    await this.prismaService.exercise.update({
      where: { id: exerciseId },
      data: {
        isCorrect: checkResult.overall.isCorrect,
        grammarCorrect: checkResult.grammarTopic.isCorrect,
        wordCorrect: checkResult.word.isCorrect,
        lastTranslation: userTranslation,
      },
    });

    const progressUpdate =
      await this.userProgressService.recordSentencePracticeResult({
        userId,
        grammarTopicId: exercise.sentence.grammarTopicId,
        wordId: exercise.sentence.wordId,
        isGrammarTopicCorrect: checkResult.grammarTopic.isCorrect,
        isWordCorrect: checkResult.word.isCorrect,
      });

    await this.exerciseSessionService.recordExerciseResult(
      userId,
      session.id,
      checkResult.overall.isCorrect,
    );

    return {
      result: checkResult,
      levelUp: progressUpdate.userCefrLevelUpdated,
      newCefrLevel: progressUpdate.newCefrLevel,
    };
  }

  async skipExercise(userId: number, exerciseId: number) {
    const session = await this.exerciseSessionService.getActiveSession(userId);

    if (!session) {
      throw new BadRequestException('Сессия упражнений не найдена');
    }

    await this.prismaService.exercise.update({
      where: { id: exerciseId },
      data: {
        isCorrect: false, // Считаем пропущенное упражнение неверным
        lastTranslation: 'Пропущено пользователем',
      },
    });

    await this.exerciseSessionService.recordExerciseResult(
      userId,
      session.id,
      false,
    );

    return {
      message: 'Упражнение пропущено',
    };
  }

  async getExerciseHistory(
    userId: number,
    { limit = 20, offset = 0 }: { limit: number; offset: number },
  ) {
    const exercises = await this.prismaService.exercise.findMany({
      where: { userId },
      include: {
        sentence: {
          include: {
            word: true,
            grammarTopic: true,
          },
        },
        exerciseSession: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return {
      exercises,
      total: await this.prismaService.exercise.count({
        where: { userId },
      }),
    };
  }

  async getSessionHistory(
    userId: number,
    { limit = 10, offset = 0 }: { limit: number; offset: number },
  ) {
    const sessions = await this.exerciseSessionService.getSessionHistory(
      userId,
      {
        limit,
        offset,
      },
    );

    const total = await this.prismaService.exerciseSession.count({
      where: { userId },
    });

    return {
      sessions,
      total,
    };
  }

  async getSessionDetails(userId: number, sessionId: number) {
    const sessionDetails = await this.exerciseSessionService.getSessionDetails(
      userId,
      sessionId,
    );

    // Рассчитываем дополнительную статистику
    const duration = sessionDetails.endedAt
      ? Math.round(
          (sessionDetails.endedAt.getTime() -
            sessionDetails.startedAt.getTime()) /
            1000 /
            60,
        )
      : null;

    const accuracy =
      sessionDetails.exercisesCompleted > 0
        ? Math.round(
            (sessionDetails.correctAnswers /
              sessionDetails.exercisesCompleted) *
              100,
          )
        : 0;

    return {
      session: {
        id: sessionDetails.id,
        startedAt: sessionDetails.startedAt,
        endedAt: sessionDetails.endedAt,
        exercisesCompleted: sessionDetails.exercisesCompleted,
        correctAnswers: sessionDetails.correctAnswers,
        incorrectAnswers: sessionDetails.incorrectAnswers,
        duration,
        accuracy,
      },
      exercises: sessionDetails.exercises.map((ex) => ({
        id: ex.id,
        englishSentence: ex.sentence.englishSentence,
        russianTranslation: ex.sentence.russianTranslation,
        userTranslation: ex.lastTranslation,
        isCorrect: ex.isCorrect,
        wordCorrect: ex.wordCorrect,
        grammarCorrect: ex.grammarCorrect,
        word: {
          id: ex.sentence.word.id,
          word: ex.sentence.word.word,
          russianTranslation: ex.sentence.word.russianTranslation,
        },
        grammarTopic: {
          id: ex.sentence.grammarTopic.id,
          name: ex.sentence.grammarTopic.name,
          description: ex.sentence.grammarTopic.description,
        },
      })),
    };
  }
}
