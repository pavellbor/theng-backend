import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

export const AuthUser = (role: Role = Role.USER) => {
  const decorators = [
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    UseGuards(RolesGuard),
    Roles(role),
    ApiForbiddenResponse(),
    ApiUnauthorizedResponse(),
  ];

  return applyDecorators(...decorators);
};
