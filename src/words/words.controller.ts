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
  UseGuards,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WordEntity } from './entities/word.entity';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('words')
@ApiBearerAuth()
@Controller('words')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MODERATOR)
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  @ApiCreatedResponse({ type: WordEntity })
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @Get()
  @ApiOkResponse({ type: [WordEntity] })
  findAll() {
    return this.wordsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: WordEntity })
  @ApiNotFoundResponse({ type: NotFoundException })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wordsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: WordEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWordDto: UpdateWordDto,
  ) {
    return this.wordsService.update(id, updateWordDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WordEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wordsService.remove(id);
  }
}
