import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

export const AuthUser = (roles?: Role[]) => {
  const decorators = [
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse(),
  ];

  if (roles?.length) {
    decorators.push(
      Roles(...roles),
      UseGuards(RolesGuard),
      ApiForbiddenResponse(),
    );
  }

  return applyDecorators(...decorators);
};
