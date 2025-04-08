import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { RequireCefrLevel } from '../users/decorators/require-cefr-level.decorator';
import { UserStatsService } from './services/user-stats.service';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('user-progress')
@ApiTags('Прогресс обучения')
@RequireCefrLevel()
@AuthUser()
export class UserProgressController {
  constructor(private readonly userStatsService: UserStatsService) {}

  @Get('stats')
  @ApiOperation({
    summary: 'Получить статистику и прогресс обучения пользователя',
  })
  async getUserLearningStatsAndProgress(@CurrentUser() user: User) {
    return this.userStatsService.getUserLearningStatsAndProgress(user);
  }
}
