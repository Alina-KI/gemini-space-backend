import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from '../../user/schemas/user.schema';
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

  @Prop({
    type: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String },
        picture: { type: String },
        file: { type: String },
        date: { type: String },
      },
    ],
  })
  messages: MongooseArray<{
    sender: UserDocument;
    text: string;
    picture: string;
    file: string;
    date: string;
  }>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: MongooseArray<User>;

  @Prop()
  image: string;
}

export const DialogueSchema = SchemaFactory.createForClass(Dialogue);
