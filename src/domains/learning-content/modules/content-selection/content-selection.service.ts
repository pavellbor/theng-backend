import { Injectable } from '@nestjs/common';
import { WordSelectionService } from './services/word-selection.service';
import { GrammarTopicSelectionService } from './services/grammar-topic-selection.service';
import { CEFRLevel } from '@prisma/client';
@Injectable()
export class ContentSelectionService {
  constructor(
    private readonly wordSelectionService: WordSelectionService,
    private readonly grammarTopicSelectionService: GrammarTopicSelectionService,
  ) {}

  async getContentForReview(
    userId: number,
    cefrLevel: CEFRLevel,
    count: number,
  ) {
    const [words, grammarTopics] = await Promise.all([
      this.wordSelectionService.getForReview(userId, cefrLevel, count),
      this.grammarTopicSelectionService.getForReview(userId, cefrLevel, count),
    ]);

    return { words, grammarTopics };
  }
}
