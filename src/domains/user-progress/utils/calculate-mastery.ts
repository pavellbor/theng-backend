/**
 * Рассчитывает уровень мастерства на основе успешных и неудачных попыток.
 * Возвращает значение от 0 до 1, округленное до двух знаков после запятой.
 * @param successCount количество успешных попыток
 * @param failureCount количество неудачных попыток
 * @returns значение мастерства от 0 до 1 с двумя знаками после запятой
 */
export function calculateMastery(
  successCount: number,
  failureCount: number,
): number {
  const total = successCount + failureCount;
  if (total === 0) return 0;
  // Округление до двух знаков после запятой
  return Math.round((successCount / total) * 100) / 100;
}
