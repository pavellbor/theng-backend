import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
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
  register(@Body() registerAuthDto: RegisterAuthDto): Promise<AccessTokenRdo> {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вход в систему' })
  @ApiOkResponse({ type: AccessTokenRdo })
  login(@Body() loginAuthDto: LoginAuthDto): Promise<AccessTokenRdo> {
    return this.authService.login(loginAuthDto);
  }
}
