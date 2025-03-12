import { Injectable } from '@nestjs/common';
import { TranslationCheckService } from './services/translation-check.service';
import { CEFRLevel, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SentenceGenerationService } from './services/sentence-generation.service';
import { UserProgressService } from 'src/user-progress/user-progress.service';
import { CheckTranslationDto } from './dto/check-translation.dto';

interface NextExerciseParams {
  userId: number;
  cefrLevel: CEFRLevel;
  userRole: Role;
}

@Injectable()
export class ExerciseService {
  constructor(
    private prismaService: PrismaService,
    private sentenceGenerationService: SentenceGenerationService,
    private translationCheckService: TranslationCheckService,
    private userProgressService: UserProgressService,
  ) {}

  async nextExercise(params: NextExerciseParams) {
    const { cefrLevel, userId, userRole } = params;

    const { word, grammarTopic } =
      await this.userProgressService.getLearningContentForReview(
        userId,
        cefrLevel,
      );

    const generatedSentence =
      await this.sentenceGenerationService.generateSentence({
        word: word.word,
        partOfSpeech: word.partOfSpeech,
        cefrLevel: cefrLevel,
        definition: word.definition,
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

    return userRole === Role.USER
      ? {
          sentenceId: sentence.id,
          russianTranslation: sentence.russianTranslation,
        }
      : {
          sentenceId: sentence.id,
          russianTranslation: sentence.russianTranslation,
          sentence: sentence,
        };
  }

  async checkTranslation(
    userId: number,
    userRole: Role,
    checkTranslationDto: CheckTranslationDto,
  ) {
    const { userTranslation, sentenceId } = checkTranslationDto;

    const sentence = await this.prismaService.sentence.findUniqueOrThrow({
      where: { id: sentenceId },
      include: {
        grammarTopic: true,
        word: true,
      },
    });

    const completion = await this.translationCheckService.checkTranslation({
      englishSentence: sentence.englishSentence,
      russianTranslation: sentence.russianTranslation,
      grammarTopicName: sentence.grammarTopic.name,
      word: sentence.word.definition,
      userTranslation: userTranslation,
      cefrLevel: sentence.grammarTopic.cefrLevel, // TODO
    });

    const userProgress =
      await this.userProgressService.recordSentencePracticeResult({
        userId,
        grammarTopicId: sentence.grammarTopicId,
        wordId: sentence.wordId,
        sentenceId: sentence.id,
        isGrammarTopicCorrect: completion.grammarTopic.isCorrect,
        isSentenceCorrect: completion.overall.isCorrect,
        isWordCorrect: completion.word.isCorrect,
      });

    return userRole === Role.USER
      ? completion
      : {
          ...completion,
          userProgress,
        };
  }
}
