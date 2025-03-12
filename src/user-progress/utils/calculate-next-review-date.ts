export const REVIEW_INTERVALS_DAYS = [
  1, // После первого повторения - через 1 день
  3, // После второго - через 3 дня
  7, // После третьего - через 7 дней
  16, // После четвертого - через 16 дней
  30, // После пятого - через 30 дней
  60, // После шестого - через 60 дней (2 месяца)
  180, // После седьмого - через 180 дней (6 месяцев)
  365, // После восьмого - через 365 дней (1 год)
  // ... можно добавить и далее, увеличивая интервалы ...
];

export function calculateNextReviewDate(reviewCount: number): Date {
  const now = new Date();
  let daysToAdd = 1; // По умолчанию 1 день для первого повторения

  if (reviewCount > 0 && reviewCount <= REVIEW_INTERVALS_DAYS.length) {
    daysToAdd = REVIEW_INTERVALS_DAYS[reviewCount - 1]; // Используем интервал из массива
  } else if (reviewCount > REVIEW_INTERVALS_DAYS.length) {
    daysToAdd = REVIEW_INTERVALS_DAYS[REVIEW_INTERVALS_DAYS.length - 1]; // Если reviewCount больше, чем интервалы, используем последний интервал
  }
  // Если reviewCount <= 0,  останется daysToAdd = 1 (первое повторение)

  const nextReviewDate = new Date(now);
  nextReviewDate.setDate(now.getDate() + daysToAdd); // Используем setDate для добавления дней
  return nextReviewDate;
}
