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
  UseGuards,
} from '@nestjs/common';
import { GrammarTopicsService } from './grammar-topics.service';
import { CreateGrammarTopicDto } from './dto/create-grammar-topic.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateGrammarTopicDto } from './dto/update-grammar-topic.dto';
import { GrammarTopicEntity } from './entities/grammar-topic.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('grammar-topics')
@ApiBearerAuth()
@Controller('grammar-topics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MODERATOR)
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
