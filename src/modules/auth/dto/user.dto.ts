import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/modules/clients';
import { Employee } from 'src/modules/employees';
import { UserTypes } from '../types/user.type';

export class UserDto {
  @ApiProperty({ enum: ['administrator', 'employee', 'client'] })
  type: UserTypes;

  @ApiProperty()
  user: Employee | Client;
}
