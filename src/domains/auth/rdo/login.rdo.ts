import { ApiProperty } from '@nestjs/swagger';
import { UserRdo } from 'src/domains/users/rdo/user.rdo';

export class LoginRdo {
  @ApiProperty({
    type: UserRdo,
    description: 'Пользователь',
  })
  user: UserRdo;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'JWT токен',
  })
  token: string;
}
