import { CEFRLevel } from '@prisma/client';

export interface CheckTranslationParams {
  russianTranslation: string;
  englishSentence: string;
  userTranslation: string;
  word: string;
  grammarTopicName: string;
  cefrLevel: CEFRLevel;
}
