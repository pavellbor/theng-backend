import { Module } from '@nestjs/common';
import { WordSelectionService } from './services/word-selection.service';
import { GrammarTopicSelectionService } from './services/grammar-topic-selection.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WordSelectionService, GrammarTopicSelectionService],
  exports: [WordSelectionService, GrammarTopicSelectionService],
})
export class ContentSelectionModule {}
