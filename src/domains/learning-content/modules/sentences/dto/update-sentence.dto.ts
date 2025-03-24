import { CreateSentenceDto } from './create-sentence.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateSentenceDto extends PartialType(CreateSentenceDto) {}
