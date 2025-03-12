import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

interface CustomRequest extends Request {
  user?: UserEntity;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('requiredRoles', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<CustomRequest>();

    console.log(user)

    if (!user) {
      return false;
    }

    const userRole = user.role;

    if (requiredRoles.some((role) => userRole === role)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
