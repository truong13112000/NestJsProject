import { Role } from './../enum/role.enum';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    const accessToken = token && token.split('Bearer ')[1];
    const user = this.jwtService.decode(accessToken, { complete: true });
    if (!user) {
      throw new UnauthorizedException('Token wrong.');
    }
    if (!token || !accessToken) {
      throw new UnauthorizedException('Token invalid');
    }
    const findByUsername = await this.userService.findByUsername(
      user['payload']['username'],
    );
    const checkAuthor = roles.some((role) =>
      findByUsername.role?.includes(role),
    );
    return checkAuthor;
  }
}
