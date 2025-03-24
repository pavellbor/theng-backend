import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { UserProgressModule } from 'src/domains/user-progress/user-progress.module';
import { ExerciseService } from './exercises.service';
import { ExerciseSessionService } from './services/exercise-session.service';
import { LearningContentModule } from 'src/domains/learning-content/learning-content.module';
import { AiServicesModule } from '../ai-services/ai-services.module';
@Module({
  controllers: [ExercisesController],
  providers: [ExerciseService, ExerciseSessionService],
  imports: [UserProgressModule, LearningContentModule, AiServicesModule],
})
export class ExercisesModule {}
