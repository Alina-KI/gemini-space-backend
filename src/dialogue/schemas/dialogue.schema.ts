import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type DialogueDocument = Dialogue & Document;

@Schema()
export class Dialogue {
  @Prop()
  nameTalk: string;

  @Prop()
  creatorId: string;

  // @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Message' }] })
  // messages: Message[];
  // @Prop({ type: [{ Message: { type: mongoose.Types.ObjectId } }] })
  // messages: Message[];
  @Prop()
  messages: {
    senderId: string;
    text: string;
    picture: string;
    file: string;
    date: string;
  }[];

  @Prop({ type: [{ User: mongoose.Types.ObjectId }] })
  users: User[];
}

export const DialogueSchema = SchemaFactory.createForClass(Dialogue);
