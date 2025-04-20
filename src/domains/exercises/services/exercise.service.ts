import { Injectable } from '@nestjs/common';
import { CEFRLevel, Exercise, GrammarTopic, Word } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { SentencesService } from 'src/domains/learning-content/modules/sentences/sentences.service';
import { SentenceGenerationService } from 'src/domains/ai-services/modules/sentence-generation/sentence-generation.service';
import { TranslationCheckService } from 'src/domains/ai-services/modules/translation-check/translation-check.service';
import {
  TranslationHint,
  HintType,
} from 'src/domains/ai-services/modules/translation-check/interfaces/translation-hint.interface';

@Injectable()
export class ExerciseService {
  constructor(
    private prismaService: PrismaService,
    private sentenceGenerationService: SentenceGenerationService,
    private sentencesService: SentencesService,
    private translationCheckService: TranslationCheckService,
  ) {}

  async generateExercise(
    sessionId: number,
    userId: number,
    cefrLevel: CEFRLevel,
    word: Word,
    grammarTopic: GrammarTopic,
  ) {
    const generatedSentence =
      await this.sentenceGenerationService.generateSentence({
        word: word.word,
        partOfSpeech: word.partOfSpeech,
        russianTranslation: word.russianTranslation,
        cefrLevel: cefrLevel,
        grammarTopic: grammarTopic.name,
      });

    console.log(generatedSentence);

    const sentence = await this.sentencesService.create({
      englishSentence: generatedSentence.englishSentence,
      russianTranslation: generatedSentence.russianTranslation,
      literalTranslation: generatedSentence.literalTranslation,
      grammarTopicId: grammarTopic.id,
      wordId: word.id,
      cefrLevel: cefrLevel,
    });

    const isWordRepetition =
      await this.prismaService.userWordProgress.findFirst({
        where: {
          userId,
          wordId: word.id,
        },
      });

    const isGrammarRepetition =
      await this.prismaService.userGrammarTopicProgress.findFirst({
        where: {
          userId,
          grammarTopicId: grammarTopic.id,
        },
      });

    const exercise = await this.prismaService.exercise.create({
      data: {
        userId,
        sentenceId: sentence.id,
        exerciseSessionId: sessionId,
        isWordRepetition: Boolean(isWordRepetition),
        isGrammarRepetition: Boolean(isGrammarRepetition),
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

  async checkAnswer(exerciseId: number, userTranslation: string) {
    const exercise = await this.getExercise(exerciseId);

    const translationFeedback =
      await this.translationCheckService.checkTranslation({
        englishSentence: exercise.sentence.englishSentence,
        russianTranslation: exercise.sentence.russianTranslation,
        grammarTopicName: exercise.sentence.grammarTopic.name,
        word: exercise.sentence.word.russianTranslation,
        userTranslation: userTranslation,
        cefrLevel: exercise.sentence.cefrLevel,
      });

    const updatedExercise = await this.prismaService.exercise.update({
      where: { id: exerciseId },
      data: {
        isCorrect: translationFeedback.overall.isCorrect,
        grammarCorrect: translationFeedback.grammarTopic.isCorrect,
        wordCorrect: translationFeedback.word.isCorrect,
        lastTranslation: userTranslation,
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

    return {
      exercise: updatedExercise,
      translationFeedback,
    };
  }

  async skipExercise(exerciseId: number): Promise<Exercise> {
    return this.prismaService.exercise.update({
      where: { id: exerciseId },
      data: { isCorrect: false, lastTranslation: 'Пропущено пользователем' },
    });
  }

  getExercise(exerciseId: number) {
    return this.prismaService.exercise.findUniqueOrThrow({
      where: { id: exerciseId },
      include: {
        sentence: {
          include: {
            grammarTopic: true,
            word: true,
          },
        },
      },
    });
  }

  async getExerciseHistory(userId: number) {
    return this.prismaService.exercise.findMany({
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
    });
  }

  async getTranslationHint(
    exerciseId: number,
    hintType: HintType = HintType.BOTH,
  ): Promise<TranslationHint> {
    const exercise = await this.getExercise(exerciseId);

    const updateData: Partial<Exercise> = {};

    if (hintType === HintType.WORD || hintType === HintType.BOTH) {
      updateData.usedWordHint = true;
    }

    if (hintType === HintType.GRAMMAR || hintType === HintType.BOTH) {
      updateData.usedGrammarHint = true;
    }

    // Обновляем упражнение, устанавливая флаги использования подсказок в зависимости от типа
    await this.prismaService.exercise.update({
      where: { id: exerciseId },
      data: updateData,
    });

    // Если у предложения уже есть подсказки, возвращаем их в зависимости от запрошенного типа
    if (exercise.sentence.wordHint && exercise.sentence.grammarHint) {
      const storedHint: TranslationHint = {
        wordHint:
          hintType === HintType.WORD || hintType === HintType.BOTH
            ? exercise.sentence.wordHint
            : '',
        grammarHint:
          hintType === HintType.GRAMMAR || hintType === HintType.BOTH
            ? exercise.sentence.grammarHint
            : '',
        generalHint:
          hintType === HintType.BOTH ? exercise.sentence.generalHint || '' : '',
      };
      return storedHint;
    }

    // Если подсказок нет, запрашиваем их и сохраняем
    const hint = await this.translationCheckService.getTranslationHint({
      englishSentence: exercise.sentence.englishSentence,
      russianTranslation: exercise.sentence.russianTranslation,
      grammarTopicName: exercise.sentence.grammarTopic.name,
      word: exercise.sentence.word.russianTranslation,
      userTranslation: '', // Пустая строка, так как мы запрашиваем подсказку до ввода перевода
      cefrLevel: exercise.sentence.cefrLevel,
    });

    // Сохраняем полученные подсказки в предложении
    await this.sentencesService.update(exercise.sentence.id, {
      wordHint: hint.wordHint,
      grammarHint: hint.grammarHint,
      generalHint: hint.generalHint,
    });

    // Возвращаем подсказки в зависимости от запрошенного типа
    const filteredHint: TranslationHint = {
      wordHint:
        hintType === HintType.WORD || hintType === HintType.BOTH
          ? hint.wordHint
          : '',
      grammarHint:
        hintType === HintType.GRAMMAR || hintType === HintType.BOTH
          ? hint.grammarHint
          : '',
      generalHint: hintType === HintType.BOTH ? hint.generalHint || '' : '',
    };

    return filteredHint;
  }
}
