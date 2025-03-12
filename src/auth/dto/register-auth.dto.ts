import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegisterAuthDto extends PickType(CreateUserDto, [
  'email',
  'name',
  'password',
] as const) {}
