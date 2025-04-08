import { CEFRLevel } from '@prisma/client';

export const getNextLevel = (currentLevel: CEFRLevel): CEFRLevel | null => {
  const levels = [
    CEFRLevel.A1,
    CEFRLevel.A2,
    CEFRLevel.B1,
    CEFRLevel.B2,
    CEFRLevel.C1Plus,
  ];

  const currentIndex = levels.indexOf(currentLevel);

  if (currentIndex < levels.length - 1) {
    return levels[currentIndex + 1];
  }

  return null;
};
