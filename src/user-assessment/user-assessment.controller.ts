import { Controller, Post, Body } from '@nestjs/common';
import { UserAssessmentService } from './user-assessment.service';
import { ApiTags } from '@nestjs/swagger';
import { CheckTranslationDto } from './dto/check-translation.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

@ApiTags('user-assessment')
@Controller('user-assessment')
@AuthUser()
export class UserAssessmentController {
  constructor(private userAssessmentService: UserAssessmentService) {}

  @Post('start')
  startAssessment(@CurrentUser('id') userId: number) {
    return this.userAssessmentService.startAssessment(userId);
  }

  @Post('check')
  checkTranslation(@Body() checkTranslationDto: CheckTranslationDto) {
    return this.userAssessmentService.checkTranslation(checkTranslationDto);
  }
}
