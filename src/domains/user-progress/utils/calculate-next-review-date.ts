import * as dayjs from 'dayjs';

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

/**
 * Рассчитывает дату следующего повторения на основе количества повторений и уровня освоения
 * @param reviewCount текущее количество повторений
 * @param isCorrect был ли последний ответ правильным
 * @param mastery уровень освоения (от 0 до 1)
 * @returns Дата следующего повторения
 */
export function calculateNextReviewDate(
  reviewCount: number,
  isCorrect: boolean = true,
  mastery: number = 0,
): Date {
  const now = dayjs();

  // Если ответ неверный, всегда повторяем через 1 день
  if (!isCorrect) {
    return now.add(1, 'day').toDate();
  }

  // Для правильных ответов используем интервалы из массива,
  // но с корректировкой на основе mastery

  // Определяем эффективный индекс для выбора интервала
  // Используем mastery как индикатор стабильности знаний
  // Чем ниже mastery, тем меньше индекс (короче интервал)
  let effectiveReviewCount = Math.ceil(reviewCount * mastery);

  // Минимальный эффективный счетчик - 1
  effectiveReviewCount = Math.max(1, effectiveReviewCount);

  // Ограничиваем индекс размером массива
  let intervalIndex = Math.min(
    effectiveReviewCount - 1,
    REVIEW_INTERVALS_DAYS.length - 1,
  );

  // Для безопасности проверяем, что индекс не отрицательный
  intervalIndex = Math.max(0, intervalIndex);

  // Получаем интервал из массива
  const daysToAdd = REVIEW_INTERVALS_DAYS[intervalIndex];

  return now.add(daysToAdd, 'day').toDate();
}
