import { Module } from '@nestjs/common';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dialogue, DialogueSchema } from './schemas/dialogue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dialogue.name, schema: DialogueSchema },
    ]),
  ],
  controllers: [DialogueController],
  providers: [DialogueService],
})
export class DialogueModule {}
