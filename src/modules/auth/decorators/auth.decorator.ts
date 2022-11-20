import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { UserGuard } from '../guards/user.guard';
import { UserTypes } from '../types/user.type';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDto | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export function Auth(user: UserTypes[]) {
  return applyDecorators(ApiBearerAuth(), SetMetadata('userTypes', user), UseGuards(UserGuard));
}
