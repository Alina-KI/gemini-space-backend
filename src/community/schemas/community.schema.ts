import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Post } from '../../post/schemas/post.schema';
import { MongooseArray } from '../../mongoose-array.types';

export type CommunityDocument = Community & Document;

@Schema()
export class Community {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: MongooseArray<User>;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  creator: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: MongooseArray<Post>;

  @Prop()
  photo: string;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
