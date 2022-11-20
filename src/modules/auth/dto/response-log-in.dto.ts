import { ApiProperty } from '@nestjs/swagger';
import { UserTypes } from '../types/user.type';

export class ResponseLogInDto {
  @ApiProperty({ enum: ['administrator', 'employee', 'client'] })
  type: UserTypes;

  @ApiProperty()
  id: number;

  @ApiProperty()
  token: string;
}
