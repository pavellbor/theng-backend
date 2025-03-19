import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CheckTranslationDto } from './dto/check-translation.dto';
import { ExerciseService } from './exercises.service';
import { User } from '@prisma/client';

@Controller('exercises')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ExercisesController {
  constructor(private exerciseService: ExerciseService) {}

  @Post('start')
  startSession(@Request() req: { user: User }) {
    return this.exerciseService.startSession(req.user.id);
  }

  @Post('end')
  endSession(@Request() req: { user: User }) {
    return this.exerciseService.endSession(req.user.id);
  }

  @Get('next')
  getNextExercise(@Request() req: { user: User }) {
    return this.exerciseService.getNextExercise(
      req.user.id,
      req.user.cefrLevel,
    );
  }

  @Post('check')
  checkTranslation(
    @Request() req: { user: User },
    @Body() checkTranslationDto: CheckTranslationDto,
  ) {
    return this.exerciseService.checkTranslation(
      req.user.id,
      checkTranslationDto,
    );
  }

  @Post('skip')
  skipExercise(
    @Request() req: { user: User },
    @Body() body: { exerciseId: number },
  ) {
    return this.exerciseService.skipExercise(req.user.id, body.exerciseId);
  }

  @Get('history')
  getExerciseHistory(
    @Request() req: { user: User },
    @Query() query: { limit: number; offset: number },
  ) {
    return this.exerciseService.getExerciseHistory(req.user.id, {
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Get('sessions')
  getSessionHistory(
    @Request() req: { user: User },
    @Query() query: { limit: number; offset: number },
  ) {
    return this.exerciseService.getSessionHistory(req.user.id, {
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Get('session/:id')
  getSessionDetails(
    @Request() req: { user: User },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.exerciseService.getSessionDetails(req.user.id, id);
  }
}
