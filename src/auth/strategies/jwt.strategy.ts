import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(token: string) {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
