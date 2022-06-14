import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DialogueModule } from './dialogue/dialogue.module';
import { FilesModule } from './files/files.module';
import { CommunityModule } from './community/community.module';

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
    FilesModule,
    CommunityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
