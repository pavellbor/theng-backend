import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { SentencesService } from './sentences.service';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SentenceEntity } from './entities/sentence.entity';

@Controller('sentences')
@ApiTags('sentences')
export class SentencesController {
  constructor(private readonly sentencesService: SentencesService) {}

  @Post()
  @ApiCreatedResponse({ type: SentenceEntity })
  create(@Body() createSentenceDto: CreateSentenceDto) {
    return this.sentencesService.create(createSentenceDto);
  }

  @Get()
  @ApiOkResponse({ type: SentenceEntity })
  @ApiNotFoundResponse({ type: NotFoundException })
  findAll() {
    return this.sentencesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SentenceEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sentencesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SentenceEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSentenceDto: UpdateSentenceDto,
  ) {
    return this.sentencesService.update(id, updateSentenceDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SentenceEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sentencesService.remove(id);
  }
}
