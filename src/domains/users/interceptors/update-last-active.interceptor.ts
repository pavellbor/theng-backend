import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from 'src/common/types/request-with-user.type';

@Injectable()
export class UpdateLastActiveInterceptor implements NestInterceptor {
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

          if (now.getTime() - lastActiveTime > this.MIN_UPDATE_INTERVAL) {
            this.usersService.updateLastActive(user.id).catch((error) => {
              console.error('Failed to update lastActive:', error);
            });
          }
        }
      }),
    );
  }
}
