import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async canActivate(
    context: any,
  ): Promise<
    boolean | any | Promise<boolean | any> | Observable<boolean | any>
  > {
    const socket = context.args[0];
    const bearerToken = socket.handshake.headers.authorization.split(' ')[1];
    try {
      const decodedToken = this.jwt.verify(bearerToken) as any;
      console.log('ЧЕЛ', await this.userService.findOne(decodedToken.id));
      (context.switchToHttp() as HttpArgumentsHost).getRequest().user =
        await this.userService.findOne(decodedToken.id);
      return true;
    } catch (e) {
      console.log('err in guard', e);
      return false;
    }
  }
}
