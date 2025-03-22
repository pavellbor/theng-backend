import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RequestWithUser } from 'src/common/types/request-with-user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    if (!user) {
      return false;
    }

    const RolesWeight = {
      [Role.ADMIN]: 3,
      [Role.MODERATOR]: 2,
      [Role.USER]: 1,
    };

    const userRole = user.role;

    if (
      requiredRoles.some((role) => RolesWeight[userRole] >= RolesWeight[role])
    ) {
      return true;
    }

    throw new ForbiddenException();
  }
}
