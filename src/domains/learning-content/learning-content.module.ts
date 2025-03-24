import { Module } from '@nestjs/common';
import { GrammarTopicsModule } from './modules/grammar-topics/grammar-topics.module';
import { WordsModule } from './modules/words/words.module';
import { UserProgressModule } from 'src/domains/user-progress/user-progress.module';
import { ContentSelectionModule } from './modules/content-selection/content-selection.module';
import { SentencesModule } from './modules/sentences/sentences.module';

@Module({
  imports: [
    UserProgressModule,
    GrammarTopicsModule,
    WordsModule,
    ContentSelectionModule,
    SentencesModule,
  ],
  exports: [ContentSelectionModule, SentencesModule],
})
export class LearningContentModule {}
