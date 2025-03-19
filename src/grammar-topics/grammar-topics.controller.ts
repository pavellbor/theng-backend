import {
  Body,
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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateGrammarTopicDto } from './dto/update-grammar-topic.dto';
import { GrammarTopicEntity } from './entities/grammar-topic.entity';
import { Role } from '@prisma/client';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

@ApiTags('grammar-topics')
@Controller('grammar-topics')
@AuthUser(Role.MODERATOR)
export class GrammarTopicsController {
  constructor(private readonly grammarTopicsService: GrammarTopicsService) {}

  @Post()
  @ApiCreatedResponse({ type: GrammarTopicEntity })
  create(@Body() createGrammarTopicDto: CreateGrammarTopicDto) {
    return this.grammarTopicsService.create(createGrammarTopicDto);
  }

  @Get()
  @ApiOkResponse({ type: [GrammarTopicEntity] })
  findAll() {
    return this.grammarTopicsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GrammarTopicEntity })
  @ApiNotFoundResponse({ type: NotFoundException })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.grammarTopicsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: GrammarTopicEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGrammarTopicDto: UpdateGrammarTopicDto,
  ) {
    return this.grammarTopicsService.update(id, updateGrammarTopicDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: GrammarTopicEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.grammarTopicsService.remove(id);
  }
}
