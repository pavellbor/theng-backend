import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ExercisesCheckTranslationDto } from './dto/exercises-check-translation.dto';
import { ExercisesService } from './exercises.service';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/domains/auth/decorators/current-user.decorator';
import { AuthUser } from 'src/domains/auth/decorators/auth-user.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequireCefrLevel } from 'src/domains/users/decorators/require-cefr-level.decorator';

@Controller('exercises')
@ApiTags('Обучение')
@RequireCefrLevel()
@AuthUser()
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Post('start')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Начать сессию' })
  startSession(@CurrentUser() user: User) {
    return this.exercisesService.startSession(user);
  }

  @Post('end')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Завершить сессию' })
  endSession(@CurrentUser() user: User) {
    return this.exercisesService.endSession(user);
  }

  @Post('check')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Проверить перевод' })
  checkTranslation(
    @CurrentUser() user: User,
    @Body() checkTranslationDto: ExercisesCheckTranslationDto,
  ) {
    return this.exercisesService.checkTranslation(
      user,
      checkTranslationDto.userTranslation,
    );
  }

  @Get('history')
  @ApiOperation({ summary: 'Получить историю упражнений' })
  getExerciseHistory(@CurrentUser('id') userId: number) {
    return this.exercisesService.getExerciseHistory(userId);
  }

  @Get('sessions')
  @ApiOperation({ summary: 'Получить историю сессий' })
  getSessionHistory(@CurrentUser('id') userId: number) {
    return this.exercisesService.getSessionHistory(userId);
  }

  @Get('session/:id')
  @ApiOperation({ summary: 'Получить детали сессии' })
  getSessionDetails(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.exercisesService.getSessionDetails(userId, id);
  }
}
