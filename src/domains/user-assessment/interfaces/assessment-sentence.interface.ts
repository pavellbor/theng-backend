import { CEFRLevel } from '@prisma/client';

export interface AssessmentSentence {
  englishSentence: string;
  russianTranslation: string;
  grammarTopic: string;
  word: string;
  cefrLevel: CEFRLevel;
}

export interface AssessmentSentenceWithId extends AssessmentSentence {
  id: number;
}
