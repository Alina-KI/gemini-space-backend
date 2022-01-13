import { CanActivate, Injectable } from "@nestjs/common";
import { UserService } from "../../user/user.service";
import { Observable } from "rxjs";

@Injectable()
export class WsJwtAuthGuard implements CanActivate {

  constructor(private userService: UserService) {
  }

  canActivate(
    context: any
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken = context.args[0].handshake.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(bearerToken, jwtConstants.secret) as any
    const user = this.userService.getOne(decodedToken.id)
    context.switchToHttp().getRequest().user = user
    return true;
  }
}