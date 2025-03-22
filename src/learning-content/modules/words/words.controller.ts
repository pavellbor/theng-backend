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
  BadRequestException,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { WordRdo } from './rdo/word.rdo';
import { Role } from '@prisma/client';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('words')
@ApiTags('Слова')
@AuthUser()
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Создать новое слово' })
  @ApiCreatedResponse({ type: WordRdo })
  @ApiBadRequestResponse({ type: BadRequestException })
  create(@Body() createWordDto: CreateWordDto): Promise<WordRdo> {
    return this.wordsService.create(createWordDto);
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Получить все слова' })
  @ApiOkResponse({ type: [WordRdo] })
  findAll(): Promise<WordRdo[]> {
    return this.wordsService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Получить слово по ID' })
  @ApiOkResponse({ type: WordRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<WordRdo> {
    return this.wordsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Обновить слово по ID' })
  @ApiOkResponse({ type: WordRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<WordRdo> {
    return this.wordsService.update(id, updateWordDto);
  }

  @Delete(':id')
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Удалить слово по ID' })
  @ApiOkResponse({ type: WordRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  remove(@Param('id', ParseIntPipe) id: number): Promise<WordRdo> {
    return this.wordsService.remove(id);
  }
}
