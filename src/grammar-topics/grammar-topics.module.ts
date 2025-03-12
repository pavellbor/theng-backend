import { Module } from '@nestjs/common';
import { GrammarTopicsController } from './grammar-topics.controller';
import { GrammarTopicsService } from './grammar-topics.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GrammarTopicsController],
  providers: [GrammarTopicsService],
  imports: [PrismaModule],
})
export class GrammarTopicsModule {}
