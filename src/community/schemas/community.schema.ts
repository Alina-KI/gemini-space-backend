import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';
import { PostDocument } from '../../post/schemas/post.schema';
import { MongooseArray } from '../../mongoose-array.types';

export type CommunityDocument = Community & Document;

@Schema()
export class Community {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: MongooseArray<UserDocument>;

  @Prop()
  creator: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: MongooseArray<PostDocument>;

  @Prop()
  photo: string;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
