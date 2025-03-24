import { Injectable, NotFoundException } from '@nestjs/common';
import { WordSelectionService } from './services/word-selection.service';
import { GrammarTopicSelectionService } from './services/grammar-topic-selection.service';
import { CEFRLevel } from '@prisma/client';
@Injectable()
export class ContentSelectionService {
  constructor(
    private readonly wordSelectionService: WordSelectionService,
    private readonly grammarTopicSelectionService: GrammarTopicSelectionService,
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
