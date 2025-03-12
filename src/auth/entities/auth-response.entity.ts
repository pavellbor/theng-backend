import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseEntity {
  @ApiProperty()
  accessToken: string;
}
