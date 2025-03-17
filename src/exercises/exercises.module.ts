import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { OpenAIModule } from 'src/openai/openai.module';
import { SentenceGenerationService } from './services/sentence-generation.service';
import { TranslationCheckService } from './services/translation-check.service';
import { UserProgressModule } from 'src/user-progress/user-progress.module';
import { ExerciseService } from './exercises.service';

@Module({
  controllers: [ExercisesController],
  providers: [
    SentenceGenerationService,
    TranslationCheckService,
    ExerciseService,
  ],
  imports: [PrismaModule, AuthModule, OpenAIModule, UserProgressModule],
  exports: [TranslationCheckService],
})
export class ExercisesModule {}
