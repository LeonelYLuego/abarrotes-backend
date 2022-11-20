import { Client } from 'src/modules/clients';
import { Employee } from 'src/modules/employees';
import { Role } from '../types/role.types';

export class UserDto {
  role: Role;
  user: Employee | Client;
}
