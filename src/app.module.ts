import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExercisesModule } from './exercises/exercises.module';
import { OpenAIModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { UserProgressModule } from './user-progress/user-progress.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UpdateLastActiveInterceptor } from './users/interceptors/update-last-active.interceptor';
import { UserAssessmentModule } from './user-assessment/user-assessment.module';
import { LearningContentModule } from './learning-content/learning-content.module';
@Module({
  imports: [
    PrismaModule,
    LearningContentModule,
    UsersModule,
    AuthModule,
    ExercisesModule,
    OpenAIModule,
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
