import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/role.enum';
import { ROLES_KEY } from './roles.decorators';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/schemas/user.schema';
import { jwtConstants } from './constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('UNauthorized'); // Throw exception if token is missing
    }

    const decodedToken = jwt.verify(token, jwtConstants.secret) as {
      id: string;
      user: User;
      roles: Role[];
    };
    const userRoles = decodedToken.roles || [];
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}