export const getRandomItem = <T>(list: T[]): T =>
  list[Math.floor(Math.random() * list.length)];
