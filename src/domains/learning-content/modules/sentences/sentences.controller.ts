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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AuthUser } from 'src/domains/auth/decorators/auth-user.decorator';
import { SentenceRdo } from './rdo/sentence.rdo';

@ApiTags('Предложения')
@Controller('sentences')
@AuthUser(Role.MODERATOR)
export class SentencesController {
  constructor(private readonly sentencesService: SentencesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать предложение' })
  @ApiCreatedResponse({ type: SentenceRdo })
  create(@Body() createSentenceDto: CreateSentenceDto): Promise<SentenceRdo> {
    return this.sentencesService.create(createSentenceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все предложения' })
  @ApiOkResponse({ type: SentenceRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  findAll(): Promise<SentenceRdo[]> {
    return this.sentencesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить предложение по ID' })
  @ApiOkResponse({ type: SentenceRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SentenceRdo> {
    return this.sentencesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить предложение по ID' })
  @ApiOkResponse({ type: SentenceRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSentenceDto: UpdateSentenceDto,
  ): Promise<SentenceRdo> {
    return this.sentencesService.update(id, updateSentenceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить предложение по ID' })
  @ApiOkResponse({ type: SentenceRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  remove(@Param('id', ParseIntPipe) id: number): Promise<SentenceRdo> {
    return this.sentencesService.remove(id);
  }
}
