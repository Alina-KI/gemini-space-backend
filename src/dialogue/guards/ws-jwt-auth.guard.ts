import { CanActivate, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      const decodedToken = this.jwt.verify(bearerToken) as any;
      context.switchToWs().getData().user = this.userService.getOne(
        decodedToken.id,
      );
      return true;
    } catch {
      return false;
    }
  }
}
