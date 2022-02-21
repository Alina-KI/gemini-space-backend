import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DialogueModule } from './dialogue/dialogue.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Alis:z3DarM5DxywtLM8x@cluster0.8bi0n.mongodb.net/SpaceGemini?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    DialogueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
