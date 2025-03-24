export interface AssessmentLevelStats {
  attempts: number;
  correct: number;
}

export interface AssessmentLevelStatsWithPercentage
  extends AssessmentLevelStats {
  percentage: number;
}
