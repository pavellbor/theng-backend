import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RequestWithUser } from 'src/domains/auth/interfaces/request-with-user.interface';

@Injectable()
export class CefrLevelGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      return false;
    }

    // Если у пользователя нет уровня - запретить доступ
    if (user.cefrLevel === null) {
      throw new ForbiddenException(
        'Необходимо пройти тестирование или выбрать начальный уровень',
      );
    }

    return true;
  }
}
