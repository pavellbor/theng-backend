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
import { AccessTokenRdo } from './rdo/access-token.rdo';

@Controller('auth')
@ApiTags('Авторизация')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiCreatedResponse({ type: AccessTokenRdo })
  register(@Body() RegisterDto: RegisterDto): Promise<AccessTokenRdo> {
    return this.authService.register(RegisterDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вход в систему' })
  @ApiOkResponse({ type: AccessTokenRdo })
  login(@Body() LoginDto: LoginDto): Promise<AccessTokenRdo> {
    return this.authService.login(LoginDto);
  }
}
