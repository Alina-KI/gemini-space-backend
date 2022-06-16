import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from '../../user/schemas/user.schema';
import { MongooseArray } from '../../mongoose-array.types';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  text: string;

  @Prop()
  datePublished: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: MongooseArray<UserDocument>;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
