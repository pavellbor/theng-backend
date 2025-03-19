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
import { UserRdo } from './rdo/user.rdo';
import { Role, User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
@ApiTags('Пользователи')
@AuthUser()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Получить информацию о текущем пользователе' })
  @ApiOkResponse({ type: UserRdo })
  getMe(@CurrentUser() user: User): UserRdo {
    return this.usersService.getMe(user);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiCreatedResponse({ type: UserRdo })
  create(@Body() createUserDto: CreateUserDto): Promise<UserRdo> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiOkResponse({ type: [UserRdo] })
  findAll(): Promise<UserRdo[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiOkResponse({ type: UserRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserRdo> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Обновить пользователя по ID' })
  @ApiOkResponse({ type: UserRdo })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWordDto: UpdateUserDto,
  ): Promise<UserRdo> {
    return this.usersService.update(id, updateWordDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiOkResponse({ type: UserRdo })
  remove(@Param('id', ParseIntPipe) id: number): Promise<UserRdo> {
    return this.usersService.remove(id);
  }
}
