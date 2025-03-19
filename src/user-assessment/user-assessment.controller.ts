import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { UserAssessmentService } from './user-assessment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CheckTranslationDto } from './dto/check-translation.dto';
import { User } from '@prisma/client';

@ApiTags('user-assessment')
@Controller('user-assessment')
export class UserAssessmentController {
  constructor(private userAssessmentService: UserAssessmentService) {}

  @Post('start')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  startAssessment(@Request() req: { user: User }) {
    return this.userAssessmentService.startAssessment(req.user.id);
  }

  @Post('check')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  checkTranslation(@Body() checkTranslationDto: CheckTranslationDto) {
    return this.userAssessmentService.checkTranslation(checkTranslationDto);
  }
}
