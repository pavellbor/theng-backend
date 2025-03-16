import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from 'src/types/request-with-user.type';

@Injectable()
export class UpdateLastActiveInterceptor implements NestInterceptor {
  // Минимальный интервал между обновлениями в миллисекундах (5 минут)
  private readonly MIN_UPDATE_INTERVAL = 5 * 60 * 1000;

  constructor(private usersService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return next.handle().pipe(
      tap(() => {
        const user = request.user;

        if (user) {
          const now = new Date();
          const lastActiveTime = user.lastActive.getTime();

          // Обновляем только если прошло достаточно времени
          if (now.getTime() - lastActiveTime > this.MIN_UPDATE_INTERVAL) {
            // Return the promise to avoid void return warning
            this.usersService.updateLastActive(user.id).catch((error) => {
              console.error('Failed to update lastActive:', error);
            });
          }
        }
      }),
    );
  }
}
