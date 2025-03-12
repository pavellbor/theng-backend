import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { CheckTranslationDto } from './dto/check-translation.dto';
import { ExerciseService } from './exercises.service';

@Controller('exercises')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ExercisesController {
  constructor(private exerciseService: ExerciseService) {}

  @Get('next')
  nextExercise(@Request() req: { user: UserEntity }) {
    return this.exerciseService.nextExercise({
      userId: req.user.id,
      userRole: req.user.role,
      cefrLevel: req.user.cefrLevel,
    });
  }

  @Post('check')
  checkTranslation(
    @Request() req: { user: UserEntity },
    @Body()
    checkTranslationDto: CheckTranslationDto,
  ) {
    return this.exerciseService.checkTranslation(
      req.user.id,
      req.user.role,
      checkTranslationDto,
    );
  }
}
