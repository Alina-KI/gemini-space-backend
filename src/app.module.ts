import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Alis:z3DarM5DxywtLM8x@cluster0.8bi0n.mongodb.net/SpaceGemini?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
