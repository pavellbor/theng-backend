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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

@Controller('users')
@ApiTags('Пользователи')
@AuthUser()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Получить информацию о текущем пользователе' })
  @ApiOkResponse({ type: UserEntity })
  getMe(@CurrentUser() user: User): UserEntity {
    return this.usersService.getMe(user);
  }

  @Post()
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiOkResponse({ type: [UserEntity] })
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ type: NotFoundException })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пользователя по ID' })
  @ApiOkResponse({ type: UserEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWordDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateWordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.remove(id);
  }
}
