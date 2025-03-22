import { Module } from '@nestjs/common';
import { GrammarTopicsModule } from './modules/grammar-topics/grammar-topics.module';
import { WordsModule } from './modules/words/words.module';
import { LearningContentService } from './learning-content.service';
import { UserProgressModule } from 'src/user-progress/user-progress.module';
import { WordSelectionService } from './services/word-selection.service';
import { GrammarTopicSelectionService } from './services/grammar-topic-selection.service';
@Module({
  imports: [UserProgressModule, GrammarTopicsModule, WordsModule],
  providers: [
    LearningContentService,
    WordSelectionService,
    GrammarTopicSelectionService,
  ],
  exports: [LearningContentService],
})
export class LearningContentModule {}
