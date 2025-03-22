import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/domains/users/dto/create-user.dto';

export class RegisterDto extends PickType(CreateUserDto, [
  'email',
  'name',
  'password',
] as const) {}
