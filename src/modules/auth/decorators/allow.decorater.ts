import { RolesGuard } from 'src/modules/auth/gaurds/role.gaurd';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../gaurds/auth.gaurd';

export const CheckRole = () => {
  return applyDecorators(UseGuards(RolesGuard));
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
export const Authenticated = () => {
  return applyDecorators(UseGuards(AuthGuard));
};
