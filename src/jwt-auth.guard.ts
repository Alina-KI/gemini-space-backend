import {
  CanActivate,
  createParamDecorator,
  Injectable,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization'];
    try {
      (req as any).user = await this.userService.getUserByToken(token);
      return true;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
