import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type DialogueDocument = Dialogue & Document;

@Schema()
export class Dialogue {
  @Prop()
  nameTalk: string;

  @Prop()
  _idSender: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  message: Message;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop()
  _idRecipient: string[];
}

export const DialogueSchema = SchemaFactory.createForClass(Dialogue);
