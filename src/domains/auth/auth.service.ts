import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/domains/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RegisterRdo } from './rdo/register.rdo';
import { LoginRdo } from './rdo/login.rdo';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(RegisterDto: RegisterDto): Promise<RegisterRdo> {
    const existingUser = await this.userService.findByEmail(RegisterDto.email);

    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const newUser = await this.userService.create(RegisterDto);
    const accessToken = await this.generateToken(newUser);

    return { user: newUser, token: accessToken };
  }

  async login(LoginDto: LoginDto): Promise<LoginRdo> {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const passwordMatch = await bcrypt.compare(
      LoginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const accessToken = await this.generateToken(user);

    return { user, token: accessToken };
  }

  public async validateToken(token: string) {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findOne(payload.sub);

      return user;
    } catch (error) {
      console.error('Error validating token:', error);
      throw new UnauthorizedException();
    }
  }

  private generateToken(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    return this.jwtService.signAsync(payload);
  }
}
