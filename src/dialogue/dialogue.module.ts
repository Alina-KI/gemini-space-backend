import { Module } from '@nestjs/common';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Dialogue, DialogueSchema } from './schemas/dialogue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dialogue.name,
        schema: DialogueSchema,
      },
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  controllers: [DialogueController, MessageController],
  providers: [DialogueService, MessageService],
})
export class DialogueModule {}
