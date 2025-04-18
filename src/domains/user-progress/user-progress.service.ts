import { Injectable } from '@nestjs/common';
import { UserGrammarTopicProgressService } from './services/user-grammar-topic-progress.service';
import { UserWordProgressService } from './services/user-word-progress.service';
import { CefrLevelUpdateService } from './services/cefr-level-update.service';

interface RecordSentencePracticeResultParams {
  userId: number;
  wordId: number;
  grammarTopicId: number;
  isGrammarTopicCorrect: boolean;
  isWordCorrect: boolean;
}

@Injectable()
export class UserProgressService {
  constructor(
    private userGrammarTopicProgressService: UserGrammarTopicProgressService,
    private userWordProgressService: UserWordProgressService,
    private cefrLevelUpdateService: CefrLevelUpdateService,
  ) {}

  async recordSentencePracticeResult(
    params: RecordSentencePracticeResultParams,
  ) {
    const {
      userId,
      wordId,
      grammarTopicId,
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

    const newCefrLevel =
      await this.cefrLevelUpdateService.checkAndUpdateCefrLevel(userId);

    return {
      userGrammarTopicProgress,
      userWordProgress,
      userCefrLevelUpdated: !!newCefrLevel,
      newCefrLevel,
    };
  }
}
