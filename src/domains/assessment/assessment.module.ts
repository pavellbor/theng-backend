import { Module } from '@nestjs/common';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { ExercisesModule } from 'src/domains/exercises/exercises.module';
import { UsersModule } from 'src/domains/users/users.module';
import { AssessmentSessionService } from './services/assessment-session.service';
import { AssessmentContentService } from './services/assessment-content.service';
import { LevelDeterminationService } from './services/level-determination.service';
@Module({
  imports: [ExercisesModule, UsersModule],
  controllers: [AssessmentController],
  providers: [
    AssessmentService,
    AssessmentSessionService,
    AssessmentContentService,
    LevelDeterminationService,
  ],
})
export class AssessmentModule {}
