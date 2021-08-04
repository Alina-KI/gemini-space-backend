import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: mongoose.Schema.Types.ObjectId;

  @Prop()
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
