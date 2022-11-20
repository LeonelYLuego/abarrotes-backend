import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { UserTypes } from '../types/user.type';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const bearerToken = req.headers.authorization as undefined | string;
    const token = !!bearerToken ? bearerToken.replace('Bearer ', '') : null;
    const user = await this.authService.authenticate(token);
    if (user) {
      const userTypes = this.reflector.get<UserTypes[]>(
        'userTypes',
        context.getHandler(),
      );
      req.user = user;
      for (let userType of userTypes) if (userType == user.type) return true;
    }
    throw new UnauthorizedException();
  }
}
