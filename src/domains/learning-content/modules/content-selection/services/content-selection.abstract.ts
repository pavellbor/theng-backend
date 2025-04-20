import { CEFRLevel } from '@prisma/client';

export abstract class ContentSelectionService<T> {
  async getForReview(userId: number, cefrLevel: CEFRLevel): Promise<T | null> {
    const reviewDue = await this.getReviewDue(userId);
    if (reviewDue) {
      return reviewDue;
    }

    const newContent = await this.getNew(userId, cefrLevel);
    if (newContent) {
      return newContent;
    }

    return this.getExisting(userId);
  }

  abstract getReviewDue(userId: number): Promise<T | null>;

  abstract getNew(userId: number, cefrLevel: CEFRLevel): Promise<T | null>;

  abstract getExisting(userId: number): Promise<T | null>;
}
