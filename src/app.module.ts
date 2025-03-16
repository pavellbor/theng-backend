import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WordsModule } from './words/words.module';
import { GrammarTopicsModule } from './grammar-topics/grammar-topics.module';
import { SentencesModule } from './sentences/sentences.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExercisesModule } from './exercises/exercises.module';
import { OpenAIModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { UserProgressModule } from './user-progress/user-progress.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UpdateLastActiveInterceptor } from './users/interceptors/update-last-active.interceptor';

@Module({
  imports: [
    PrismaModule,
    WordsModule,
    GrammarTopicsModule,
    SentencesModule,
    UsersModule,
    AuthModule,
    ExercisesModule,
    OpenAIModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserProgressModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UpdateLastActiveInterceptor,
    },
  ],
})
export class AppModule {}
