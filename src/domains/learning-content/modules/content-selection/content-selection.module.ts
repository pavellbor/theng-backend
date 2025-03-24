import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { ContentSelectionService } from './content-selection.service';
import { WordSelectionService } from './services/word-selection.service';
import { GrammarTopicSelectionService } from './services/grammar-topic-selection.service';
@Module({
  imports: [PrismaModule],
  providers: [
    ContentSelectionService,
    WordSelectionService,
    GrammarTopicSelectionService,
  ],
  exports: [ContentSelectionService],
})
export class ContentSelectionModule {}
