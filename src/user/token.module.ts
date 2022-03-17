import { TokenService } from './token.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      publicKey: 'publicKey',
      privateKey: 'privateKey',
      // tokenOrPayload: string | Object | Buffer,
      // verifyOrSignOrOptions?: jwt.VerifyOptions | jwt.SignOptions, down (req...)
      secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
        // switch (requestType) {
        //   case JwtSecretRequestType.SIGN:
        //     return 'privateKey';
        //   case JwtSecretRequestType.VERIFY:
        //     return 'publicKey';
        //   default:
        //     return 'secret';
        return 'secret';
        // }
      },
      signOptions: { expiresIn: '360d' },
    }),
  ],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService, JwtModule],
})
export class TokenModule {}
