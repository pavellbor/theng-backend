import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { UserGrammarTopicProgressService } from './services/user-grammar-topic-progress.service';
import { UserWordProgressService } from './services/user-word-progress.service';
import { CefrLevelUpdateService } from './services/cefr-level-update.service';
import { UserProgressController } from './user-progress.controller';
import { UserStatsService } from './services/user-stats.service';

@Module({
  providers: [
    UserProgressService,
    UserGrammarTopicProgressService,
    UserWordProgressService,
    CefrLevelUpdateService,
    UserStatsService,
  ],
  imports: [PrismaModule],
  exports: [UserProgressService],
  controllers: [UserProgressController],
})
export class UserProgressModule {}
