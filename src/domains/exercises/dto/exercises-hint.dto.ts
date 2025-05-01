import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { HintType } from 'src/domains/ai-services/modules/translation-check/interfaces/translation-hint.interface';

export class ExercisesHintQueryDto {
  @ApiProperty({
    enum: HintType,
    description: 'Тип подсказки (слово, грамматика, оба или перевод)',
    required: false,
    default: HintType.BOTH,
  })
  @IsEnum(HintType)
  @IsOptional()
  type?: HintType;
}
