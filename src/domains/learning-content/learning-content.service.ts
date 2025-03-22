import { Injectable, NotFoundException } from '@nestjs/common';
import { CEFRLevel } from '@prisma/client';
import { WordSelectionService } from './services/word-selection.service';
import { GrammarTopicSelectionService } from './services/grammar-topic-selection.service';

@Injectable()
export class LearningContentService {
  constructor(
    private wordSelectionService: WordSelectionService,
    private grammarTopicSelectionService: GrammarTopicSelectionService,
  ) {}

  async getContentForReview(userId: number, cefrLevel: CEFRLevel) {
    const [word, grammarTopic] = await Promise.all([
      this.wordSelectionService.getForReview(userId, cefrLevel),
      this.grammarTopicSelectionService.getForReview(userId, cefrLevel),
    ]);

    if (!word || !grammarTopic) {
      throw new NotFoundException('No content found for review');
    }

    return { word, grammarTopic };
  }
}
