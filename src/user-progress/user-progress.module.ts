import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserGrammarTopicProgressService } from './services/user-grammar-topic-progress.service';
import { UserWordProgressService } from './services/user-word-progress.service';
import { CefrLevelUpdateService } from './services/cefr-level-update.service';

@Module({
  providers: [
    UserProgressService,
    UserGrammarTopicProgressService,
    UserWordProgressService,
    CefrLevelUpdateService,
  ],
  imports: [PrismaModule],
  exports: [UserProgressService],
})
export class UserProgressModule {}
