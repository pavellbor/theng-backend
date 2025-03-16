import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [PrismaModule, AuthModule],
})
export class WordsModule {}
