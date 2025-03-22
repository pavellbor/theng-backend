import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { OpenAIModule } from 'src/openai/openai.module';
import { SentenceGenerationService } from './services/sentence-generation.service';
import { TranslationCheckService } from './services/translation-check.service';
import { UserProgressModule } from 'src/user-progress/user-progress.module';
import { ExerciseService } from './exercises.service';
import { ExerciseSessionService } from './services/exercise-session.service';
import { LearningContentModule } from 'src/learning-content/learning-content.module';
import { SentencesModule } from 'src/exercises/modules/sentences/sentences.module';
@Module({
  controllers: [ExercisesController],
  providers: [
    SentenceGenerationService,
    TranslationCheckService,
    ExerciseService,
    ExerciseSessionService,
  ],
  imports: [
    OpenAIModule,
    UserProgressModule,
    LearningContentModule,
    SentencesModule,
  ],
  exports: [TranslationCheckService],
})
export class ExercisesModule {}
