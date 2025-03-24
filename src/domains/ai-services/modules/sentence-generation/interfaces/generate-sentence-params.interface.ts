import { CEFRLevel } from '@prisma/client';

export interface GenerateSentenceParams {
  word: string;
  partOfSpeech: string;
  russianTranslation: string;
  grammarTopic: string;
  cefrLevel: CEFRLevel;
}
