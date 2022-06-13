import { CanActivate, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { UserDocument } from '../../user/schemas/user.schema';

export type WithUser<T> = T & {
  user: UserDocument;
};

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(
    context: any,
  ): Promise<
    boolean | any | Promise<boolean | any> | Observable<boolean | any>
  > {
    const socket = context.args[0];
    const bearerToken = socket.handshake.headers.authorization.split(' ')[1];
    try {
      (context.switchToHttp() as HttpArgumentsHost).getRequest().user =
        await this.userService.getUserByToken(bearerToken);
      return true;
    } catch (e) {
      return false;
    }
  }
}
