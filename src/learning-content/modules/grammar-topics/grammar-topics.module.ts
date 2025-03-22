import { Module } from '@nestjs/common';
import { GrammarTopicsController } from './grammar-topics.controller';
import { GrammarTopicsService } from './grammar-topics.service';

@Module({
  controllers: [GrammarTopicsController],
  providers: [GrammarTopicsService],
  exports: [GrammarTopicsService],
})
export class GrammarTopicsModule {}
