import { CEFRLevel, User } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

type WithCefrLevel<T extends User> = Omit<T, 'cefrLevel'> & {
  cefrLevel: CEFRLevel;
};

export function ensureHasLevel<T extends User>(
  user: T,
  errorMessage = 'Уровень владения языком не установлен',
): WithCefrLevel<T> {
  if (!user.cefrLevel) {
    throw new BadRequestException(errorMessage);
  }

  return user as WithCefrLevel<T>;
}
