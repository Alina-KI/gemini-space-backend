import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { MongooseArray } from '../../mongoose-array.types';

export type DialogueDocument = Dialogue & Document;

@Schema()
export class Dialogue {
  @Prop()
  nameTalk: string;

  @Prop({ type: { User: mongoose.Types.ObjectId, ref: 'User' } })
  creator: User;

  @Prop()
  isForOnlyCreator: boolean;

  @Prop()
  isGroup: boolean;

  @Prop()
  messages: MongooseArray<{
    senderId: string;
    text: string;
    picture: string;
    file: string;
    date: string;
  }>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: MongooseArray<User>;
}

export const DialogueSchema = SchemaFactory.createForClass(Dialogue);
