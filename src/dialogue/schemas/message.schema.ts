import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  _idSender: string;

  @Prop()
  text: string;

  @Prop()
  picture: string;

  @Prop()
  file: string;

  @Prop()
  date: Date;

  @Prop()
  nameTalk: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
