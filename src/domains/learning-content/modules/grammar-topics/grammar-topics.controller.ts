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
import { AuthUser } from 'src/domains/auth/decorators/auth-user.decorator';
import { Roles } from 'src/domains/auth/decorators/roles.decorator';
@Controller('grammar-topics')
@ApiTags('Грамматические темы')
@AuthUser()
export class GrammarTopicsController {
  constructor(private readonly grammarTopicsService: GrammarTopicsService) {}

  @Post()
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Создать новую грамматическую тему' })
  @ApiCreatedResponse({ type: GrammarTopicRdo })
  @ApiConflictResponse({ type: ConflictException })
  @ApiBadRequestResponse({ type: BadRequestException })
  async create(
    @Body() createGrammarTopicDto: CreateGrammarTopicDto,
  ): Promise<GrammarTopicRdo> {
    const grammarTopic = await this.grammarTopicsService.create(
      createGrammarTopicDto,
    );
    return new GrammarTopicRdo(grammarTopic);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все грамматические темы' })
  @ApiOkResponse({ type: [GrammarTopicRdo] })
  async findAll(): Promise<GrammarTopicRdo[]> {
    const grammarTopics = await this.grammarTopicsService.findAll();
    return grammarTopics.map((topic) => new GrammarTopicRdo(topic));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить грамматическую тему по ID' })
  @ApiOkResponse({ type: GrammarTopicRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GrammarTopicRdo> {
    const grammarTopic = await this.grammarTopicsService.findOne(id);
    return new GrammarTopicRdo(grammarTopic);
  }

  @Patch(':id')
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Обновить грамматическую тему' })
  @ApiOkResponse({ type: GrammarTopicRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGrammarTopicDto: UpdateGrammarTopicDto,
  ): Promise<GrammarTopicRdo> {
    const grammarTopic = await this.grammarTopicsService.update(
      id,
      updateGrammarTopicDto,
    );
    return new GrammarTopicRdo(grammarTopic);
  }

  @Delete(':id')
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Удалить грамматическую тему' })
  @ApiOkResponse({ type: GrammarTopicRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GrammarTopicRdo> {
    const grammarTopic = await this.grammarTopicsService.remove(id);
    return new GrammarTopicRdo(grammarTopic);
  }
}
