import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterRdo } from './rdo/register.rdo';
import { LoginRdo } from './rdo/login.rdo';
@Controller('auth')
@ApiTags('Авторизация')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Зарегистрировать пользователя' })
  @ApiCreatedResponse({ type: RegisterRdo })
  async register(@Body() RegisterDto: RegisterDto): Promise<RegisterRdo> {
    return await this.authService.register(RegisterDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Войти в систему' })
  @ApiOkResponse({ type: LoginRdo })
  async login(@Body() LoginDto: LoginDto): Promise<LoginRdo> {
    return await this.authService.login(LoginDto);
  }
}
