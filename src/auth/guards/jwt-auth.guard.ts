import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: UserEntity;
}
import { JwtStrategy } from '../strategies/jwt.strategy';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtStrategy: JwtStrategy) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtStrategy.validate(token);
      request.user = user;
      console.log('hihihihihih')
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    if (!request.headers.authorization) {
      return null;
    }

    const [type, token] = request.headers.authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      return null;
    }

    return token;
  }
}
