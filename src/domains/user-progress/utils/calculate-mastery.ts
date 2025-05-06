export function calculateMastery(successCount: number, failureCount: number) {
  const total = successCount + failureCount;
  if (total === 0) return 0;
  return successCount / total;
}
