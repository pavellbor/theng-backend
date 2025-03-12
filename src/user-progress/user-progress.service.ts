import { Injectable, NotFoundException } from '@nestjs/common';
import { UserGrammarTopicProgressService } from './services/user-grammar-topic-progress.service';
import { UserWordProgressService } from './services/user-word-progress.service';
import { UserSentenceProgressService } from './services/user-sentence-progress.service';
import { CEFRLevel } from '@prisma/client';

interface RecordSentencePracticeResultParams {
  userId: number;
  sentenceId: number;
  wordId: number;
  grammarTopicId: number;
  isSentenceCorrect: boolean;
  isGrammarTopicCorrect: boolean;
  isWordCorrect: boolean;
}

@Injectable()
export class UserProgressService {
  constructor(
    private userGrammarTopicProgressService: UserGrammarTopicProgressService,
    private userWordProgressService: UserWordProgressService,
    private userSentenceProgressService: UserSentenceProgressService,
  ) {}

  async recordSentencePracticeResult(
    params: RecordSentencePracticeResultParams,
  ) {
    const {
      userId,
      sentenceId,
      wordId,
      grammarTopicId,
      isSentenceCorrect,
      isGrammarTopicCorrect,
      isWordCorrect,
    } = params;

    const userGrammarTopicProgress =
      await this.userGrammarTopicProgressService.saveUserProgress(
        userId,
        grammarTopicId,
        isGrammarTopicCorrect,
      );
    const userWordProgress =
      await this.userWordProgressService.saveUserProgress(
        userId,
        wordId,
        isWordCorrect,
      );
    const userSentenceProgress =
      await this.userSentenceProgressService.saveUserProgress(
        userId,
        sentenceId,
        isSentenceCorrect,
      );

    return {
      userGrammarTopicProgress,
      userWordProgress,
      userSentenceProgress,
    };
  }

  async getLearningContentForReview(userId: number, cefrLevel: CEFRLevel) {
    const word = await this.userWordProgressService.getWordForReviewOrNew(
      userId,
      cefrLevel,
    );
    const grammarTopic =
      await this.userGrammarTopicProgressService.getTopicForReviewOrNew(
        userId,
        cefrLevel,
      );

    if (!word || !grammarTopic) {
      throw new NotFoundException();
    }

    return { word, grammarTopic };
  }
}
