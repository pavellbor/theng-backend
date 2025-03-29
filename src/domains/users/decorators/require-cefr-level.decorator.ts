import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { CefrLevelGuard } from '../guards/cefr-level.guard';

export const RequireCefrLevel = () => {
  return applyDecorators(
    UseGuards(CefrLevelGuard),
    ApiForbiddenResponse({
      description:
        'Необходимо пройти тестирование или выбрать начальный уровень',
    }),
  );
};
