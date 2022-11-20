import { UserTypes } from '../types/user.type';

export const USERS = {
  ALL: ['administrator', 'employee', 'client'] as UserTypes[],
  ADMINISTRATOR: ['administrator'] as UserTypes[],
  EMPLOYEE: ['employee'] as UserTypes[],
  CLIENT: ['client'] as UserTypes[],
};
