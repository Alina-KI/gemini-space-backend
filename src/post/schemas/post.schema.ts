import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Community } from '../../community/schemas/community.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  files: string[];

  @Prop()
  datePublished: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  user: User;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' } })
  community: Community;
}

export const PostSchema = SchemaFactory.createForClass(Post);
