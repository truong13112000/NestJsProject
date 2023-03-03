import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.validateRequest(context);
  }
  async validateRequest(context: ExecutionContext) {
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
    const result = await bcrypt.compareSync(
      user['payload']['password'],
      findByUsername['password'],
    );
    if (!result) {
      throw new UnauthorizedException('Token wrong.');
    }
    return true;
  }
}
