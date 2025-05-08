import { CEFRLevel } from '@prisma/client';

export abstract class ContentSelectionService<T> {
  async getForReview(
    userId: number,
    cefrLevel: CEFRLevel,
    count: number = 1,
  ): Promise<T[]> {
    const result = [] as T[];
    const reviewDue = await this.getReviewDue(userId, count);
    if (reviewDue) {
      result.push(...reviewDue);
    }

    if (result.length >= count) {
      return result;
    }

    const newContent = await this.getNew(
      userId,
      cefrLevel,
      count - result.length,
    );
    if (newContent) {
      result.push(...newContent);
    }

    if (result.length >= count) {
      return result;
    }

    const existingContent = await this.getExisting(
      userId,
      count - result.length,
    );
    if (existingContent) {
      result.push(...existingContent);
    }

    return result;
  }

  abstract getReviewDue(userId: number, count: number): Promise<T[]>;

  abstract getNew(
    userId: number,
    cefrLevel: CEFRLevel,
    count: number,
  ): Promise<T[]>;

  abstract getExisting(userId: number, count: number): Promise<T[]>;
}
