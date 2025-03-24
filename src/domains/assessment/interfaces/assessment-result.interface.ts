import { CEFRLevel } from '@prisma/client';
import { AssessmentLevelStatsWithPercentage } from './assessment-level-stats.interface';

export interface AssessmentResult {
  determinedLevel: CEFRLevel;
  completedSentences: number;
  levelStats: Record<CEFRLevel, AssessmentLevelStatsWithPercentage>;
}
