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
  async create(@Body() createWordDto: CreateWordDto): Promise<WordRdo> {
    const word = await this.wordsService.create(createWordDto);
    return new WordRdo(word);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все слова' })
  @ApiOkResponse({ type: [WordRdo] })
  async findAll(): Promise<WordRdo[]> {
    const words = await this.wordsService.findAll();
    return words.map((word) => new WordRdo(word));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить слово по ID' })
  @ApiOkResponse({ type: WordRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WordRdo> {
    const word = await this.wordsService.findOne(id);
    return new WordRdo(word);
  }

  @Patch(':id')
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Обновить слово' })
  @ApiOkResponse({ type: WordRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<WordRdo> {
    const word = await this.wordsService.update(id, updateWordDto);
    return new WordRdo(word);
  }

  @Delete(':id')
  @Roles(Role.MODERATOR)
  @ApiOperation({ summary: 'Удалить слово' })
  @ApiOkResponse({ type: WordRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<WordRdo> {
    const word = await this.wordsService.remove(id);
    return new WordRdo(word);
  }
}
