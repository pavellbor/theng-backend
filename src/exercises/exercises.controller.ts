import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CheckTranslationDto } from './dto/check-translation.dto';
import { ExerciseService } from './exercises.service';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

@Controller('exercises')
@AuthUser()
export class ExercisesController {
  constructor(private exerciseService: ExerciseService) {}

  @Post('start')
  startSession(@CurrentUser('id') userId: number) {
    return this.exerciseService.startSession(userId);
  }

  @Post('end')
  endSession(@CurrentUser('id') userId: number) {
    return this.exerciseService.endSession(userId);
  }

  @Get('next')
  getNextExercise(@CurrentUser() user: User) {
    return this.exerciseService.getNextExercise(user.id, user.cefrLevel);
  }

  @Post('check')
  checkTranslation(
    @CurrentUser('id') userId: number,
    @Body() checkTranslationDto: CheckTranslationDto,
  ) {
    return this.exerciseService.checkTranslation(userId, checkTranslationDto);
  }

  @Post('skip')
  skipExercise(
    @CurrentUser('id') userId: number,
    @Body() body: { exerciseId: number },
  ) {
    return this.exerciseService.skipExercise(userId, body.exerciseId);
  }

  @Get('history')
  getExerciseHistory(
    @CurrentUser('id') userId: number,
    @Query() query: { limit: number; offset: number },
  ) {
    return this.exerciseService.getExerciseHistory(userId, {
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Get('sessions')
  getSessionHistory(
    @CurrentUser('id') userId: number,
    @Query() query: { limit: number; offset: number },
  ) {
    return this.exerciseService.getSessionHistory(userId, {
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Get('session/:id')
  getSessionDetails(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.exerciseService.getSessionDetails(userId, id);
  }
}
