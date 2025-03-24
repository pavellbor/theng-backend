import { CEFRLevel } from '@prisma/client';
import { AssessmentLevelStats } from './assessment-level-stats.interface';

export interface AssessmentSession {
  id: string;
  userId: number;
  completedSentences: number;
  levelStats: Record<CEFRLevel, AssessmentLevelStats>;
  currentSentenceId?: number;
  currentLevel: CEFRLevel;
  usedSentencesIds: number[];
  isCompleted: boolean;
}
