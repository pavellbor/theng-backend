import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AccessTokenRdo } from './rdo/access-token.rdo';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(RegisterDto: RegisterDto): Promise<AccessTokenRdo> {
    const existingUser = await this.userService.findByEmail(RegisterDto.email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.userService.create(RegisterDto);
    const accessToken = await this.generateToken(newUser);

    return new AccessTokenRdo(accessToken);
  }

  async login(LoginDto: LoginDto): Promise<AccessTokenRdo> {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      LoginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateToken(user);

    return new AccessTokenRdo(accessToken);
  }

  public async validateToken(token: string) {
    try {
      console.log('Validating token:', token);
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
