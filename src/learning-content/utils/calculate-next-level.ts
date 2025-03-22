import { CEFRLevel } from '@prisma/client';

export function calculateNextLevel(cefrLevel: CEFRLevel): CEFRLevel | null {
  const cefrLevels = Object.values(CEFRLevel);
  const currentLevelIndex = cefrLevels.indexOf(cefrLevel);
  return cefrLevels[currentLevelIndex + 1] ?? null;
}
