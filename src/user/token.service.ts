import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(payload: CreateUserDto) {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(
    userId: mongoose.Schema.Types.ObjectId,
    refreshToken: string,
  ) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }
}
