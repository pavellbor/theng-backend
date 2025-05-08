export const getRandomItem = <T>(list: T[]): T =>
  list[Math.floor(Math.random() * list.length)];

export const getRandomItems = <T>(list: T[], count: number): T[] => {
  const shuffled = list.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
