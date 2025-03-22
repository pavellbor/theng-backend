import { Module } from '@nestjs/common';
import { UserAssessmentController } from './user-assessment.controller';
import { UserAssessmentService } from './user-assessment.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { ExercisesModule } from 'src/domains/exercises/exercises.module';
import { AuthModule } from 'src/domains/auth/auth.module';

@Module({
  imports: [PrismaModule, ExercisesModule, AuthModule],
  controllers: [UserAssessmentController],
  providers: [UserAssessmentService],
})
export class UserAssessmentModule {}
