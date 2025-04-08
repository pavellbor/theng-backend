export const getPercentage = (total: number, current: number) =>
  total > 0 ? (current / total) * 100 : 0;
