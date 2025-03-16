import { Module } from '@nestjs/common';
import { SentencesService } from './sentences.service';
import { SentencesController } from './sentences.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SentencesController],
  providers: [SentencesService],
  imports: [PrismaModule, AuthModule],
})
export class SentencesModule {}
