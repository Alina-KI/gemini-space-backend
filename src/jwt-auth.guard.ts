import { CanActivate, Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';

@Injectable()
export class jwtAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.get('Authorization');
    try {
      (req as any).user = await this.userService.getUserByToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
