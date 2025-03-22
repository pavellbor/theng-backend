import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GrammarTopicsService } from './grammar-topics.service';
import { CreateGrammarTopicDto } from './dto/create-grammar-topic.dto';
import {
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UpdateGrammarTopicDto } from './dto/update-grammar-topic.dto';
import { GrammarTopicRdo } from './rdo/grammar-topic.rdo';
import { Role } from '@prisma/client';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
@Controller('grammar-topics')
@ApiTags('Грамматические темы')
@AuthUser()
export class GrammarTopicsController {
  constructor(private readonly grammarTopicsService: GrammarTopicsService) {}

  @Post()
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Создание грамматической темы' })
  @ApiCreatedResponse({ type: GrammarTopicRdo })
  @ApiConflictResponse({ type: ConflictException })
  @ApiBadRequestResponse({ type: BadRequestException })
  create(
    @Body() createGrammarTopicDto: CreateGrammarTopicDto,
  ): Promise<GrammarTopicRdo> {
    return this.grammarTopicsService.create(createGrammarTopicDto);
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Получение всех грамматических тем' })
  @ApiOkResponse({ type: [GrammarTopicRdo] })
  findAll(): Promise<GrammarTopicRdo[]> {
    return this.grammarTopicsService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Получение грамматической темы по ID' })
  @ApiOkResponse({ type: GrammarTopicRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<GrammarTopicRdo> {
    return this.grammarTopicsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Обновление грамматической темы по ID' })
  @ApiOkResponse({ type: GrammarTopicRdo })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGrammarTopicDto: UpdateGrammarTopicDto,
  ): Promise<GrammarTopicRdo> {
    return this.grammarTopicsService.update(id, updateGrammarTopicDto);
  }

  @Delete(':id')
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Удаление грамматической темы по ID' })
  @ApiOkResponse({ type: GrammarTopicRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  remove(@Param('id', ParseIntPipe) id: number): Promise<GrammarTopicRdo> {
    return this.grammarTopicsService.remove(id);
  }
}
