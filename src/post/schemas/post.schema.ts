import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';
import { CommentDocument } from '../../comment/schemas/comment.schema';
import { MongooseArray } from '../../mongoose-array.types';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  photo: string;

  @Prop()
  datePublished: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: MongooseArray<CommentDocument>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: MongooseArray<UserDocument>;
}

export const PostSchema = SchemaFactory.createForClass(Post);
