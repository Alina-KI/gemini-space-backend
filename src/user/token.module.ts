import { TokenService } from './token.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      publicKey: 'hard!to-guess_secret',
      privateKey: 'hard!to-guess_secret',
      secretOrKeyProvider: (
        requestType: JwtSecretRequestType,
        // tokenOrPayload: string | Object | Buffer,
        // verifyOrSignOrOptions?: jwt.VerifyOptions | jwt.SignOptions,
      ) => {
        switch (requestType) {
          case JwtSecretRequestType.SIGN:
            return 'privateKey';
          case JwtSecretRequestType.VERIFY:
            return 'publicKey';
          default:
            return 'hard!to-guess_secret';
        }
      },
    }),
  ],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
