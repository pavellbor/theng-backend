import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './domains/auth/auth.module';
import { ExercisesModule } from './domains/exercises/exercises.module';
import { ConfigModule } from '@nestjs/config';
import { UserProgressModule } from './domains/user-progress/user-progress.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UpdateLastActiveInterceptor } from './domains/users/interceptors/update-last-active.interceptor';
import { UserAssessmentModule } from './domains/user-assessment/user-assessment.module';
import { LearningContentModule } from './domains/learning-content/learning-content.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
@Module({
  imports: [
    InfrastructureModule,
    LearningContentModule,
    UsersModule,
    AuthModule,
    ExercisesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserProgressModule,
    UserAssessmentModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UpdateLastActiveInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
