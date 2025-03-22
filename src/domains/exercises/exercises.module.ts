import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { SentenceGenerationService } from './services/sentence-generation.service';
import { TranslationCheckService } from './services/translation-check.service';
import { UserProgressModule } from 'src/domains/user-progress/user-progress.module';
import { ExerciseService } from './exercises.service';
import { ExerciseSessionService } from './services/exercise-session.service';
import { LearningContentModule } from 'src/domains/learning-content/learning-content.module';
import { SentencesModule } from 'src/domains/exercises/modules/sentences/sentences.module';
@Module({
  controllers: [ExercisesController],
  providers: [
    SentenceGenerationService,
    TranslationCheckService,
    ExerciseService,
    ExerciseSessionService,
  ],
  imports: [UserProgressModule, LearningContentModule, SentencesModule],
  exports: [TranslationCheckService],
})
export class ExercisesModule {}
