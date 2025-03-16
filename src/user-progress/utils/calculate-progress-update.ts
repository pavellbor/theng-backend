import { calculateMastery } from './calculate-mastery';
import { calculateNextReviewDate } from './calculate-next-review-date';

/**
 * Рассчитывает обновленные значения для прогресса пользователя
 * @param currentProgress текущий прогресс пользователя
 * @param isCorrect был ли ответ правильным
 * @returns объект с обновленными значениями прогресса
 */
export function calculateProgressUpdate(
  currentProgress: {
    successCount: number;
    failureCount: number;
    reviewCount: number;
    mastery: number;
  } | null,
  isCorrect: boolean,
) {
  const successCount = currentProgress?.successCount || 0;
  const failureCount = currentProgress?.failureCount || 0;
  const reviewCount = currentProgress?.reviewCount || 0;
  const mastery = currentProgress?.mastery || 0;

  const newReviewCount = reviewCount + 1;
  const newSuccessCount = successCount + (isCorrect ? 1 : 0);
  const newFailureCount = failureCount + (isCorrect ? 0 : 1);
  const newMastery = calculateMastery(newSuccessCount, newFailureCount);

  const newNextReviewDate = calculateNextReviewDate(
    newReviewCount,
    isCorrect,
    mastery,
  );

  return {
    lastStudied: new Date(),
    reviewCount: newReviewCount,
    successCount: newSuccessCount,
    failureCount: newFailureCount,
    mastery: newMastery,
    nextReviewDate: newNextReviewDate,
  };
}
