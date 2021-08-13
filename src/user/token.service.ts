import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInfo } from './dto/create-user.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: UserInfo) {
    // const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
    // const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
    // return {
    //   accessToken,
    //   refreshToken,
    // };
    return { token: this.jwtService.sign(payload) };
  }

  // async saveToken(
  //   userId: mongoose.Schema.Types.ObjectId,
  //   refreshToken: string,
  // ) {
  //   const tokenData = await this.tokenModel.findOne({ userId: userId });
  //   if (tokenData) {
  //     tokenData.refreshToken = refreshToken;
  //     console.log(tokenData);
  //     return tokenData.save();
  //   }
  //   // console.log({ userId: userId, refreshToken });
  //   return this.tokenModel.create({ userId: userId, refreshToken });
  // }
}
