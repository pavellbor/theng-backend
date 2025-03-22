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
  @ApiOperation({ summary: 'Зарегистрировать пользователя' })
  @ApiCreatedResponse({ type: AccessTokenRdo })
  async register(@Body() RegisterDto: RegisterDto): Promise<AccessTokenRdo> {
    const accessToken = await this.authService.register(RegisterDto);
    return new AccessTokenRdo(accessToken);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Войти в систему' })
  @ApiOkResponse({ type: AccessTokenRdo })
  async login(@Body() LoginDto: LoginDto): Promise<AccessTokenRdo> {
    const accessToken = await this.authService.login(LoginDto);
    return new AccessTokenRdo(accessToken);
  }
}
