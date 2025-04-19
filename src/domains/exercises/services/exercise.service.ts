import { Injectable } from '@nestjs/common';
import { CEFRLevel, Exercise, GrammarTopic, Word } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { SentencesService } from 'src/domains/learning-content/modules/sentences/sentences.service';
import { SentenceGenerationService } from 'src/domains/ai-services/modules/sentence-generation/sentence-generation.service';
import { TranslationCheckService } from 'src/domains/ai-services/modules/translation-check/translation-check.service';

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

    const sentence = await this.sentencesService.create({
      englishSentence: generatedSentence.englishSentence,
      russianTranslation: generatedSentence.russianTranslation,
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
}
