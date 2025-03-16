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
import { SentencesService } from './sentences.service';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SentenceEntity } from './entities/sentence.entity';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('sentences')
@ApiBearerAuth()
@Controller('sentences')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MODERATOR)
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
