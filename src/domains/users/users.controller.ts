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
import { CurrentUser } from 'src/domains/auth/decorators/current-user.decorator';
import { AuthUser } from 'src/domains/auth/decorators/auth-user.decorator';
import { Roles } from 'src/domains/auth/decorators/roles.decorator';

@Controller('users')
@ApiTags('Пользователи')
@AuthUser()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Получить информацию о текущем пользователе' })
  @ApiOkResponse({ type: UserRdo })
  getMe(@CurrentUser() user: User): UserRdo {
    const userData = this.usersService.getMe(user);
    return new UserRdo(userData);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить список всех пользователей' })
  @ApiOkResponse({ type: [UserRdo] })
  async findAll(): Promise<UserRdo[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserRdo(user));
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiOkResponse({ type: UserRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserRdo> {
    const user = await this.usersService.findOne(id);
    return new UserRdo(user);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiCreatedResponse({ type: UserRdo })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserRdo> {
    const user = await this.usersService.create(createUserDto);
    return new UserRdo(user);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiOkResponse({ type: UserRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserRdo> {
    const user = await this.usersService.update(id, updateUserDto);
    return new UserRdo(user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiOkResponse({ type: UserRdo })
  @ApiNotFoundResponse({ type: NotFoundException })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserRdo> {
    const user = await this.usersService.remove(id);
    return new UserRdo(user);
  }
}
