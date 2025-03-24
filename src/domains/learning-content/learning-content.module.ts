import { Module } from '@nestjs/common';
import { GrammarTopicsModule } from './modules/grammar-topics/grammar-topics.module';
import { WordsModule } from './modules/words/words.module';
import { LearningContentService } from './learning-content.service';
import { UserProgressModule } from 'src/domains/user-progress/user-progress.module';
import { ContentSelectionModule } from './modules/content-selection/content-selection.module';

@Module({
  imports: [
    UserProgressModule,
    GrammarTopicsModule,
    WordsModule,
    ContentSelectionModule,
  ],
  providers: [LearningContentService],
  exports: [LearningContentService],
})
export class LearningContentModule {}
