import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { DialogueDocument } from '../../dialogue/schemas/dialogue.schema';
import { Post } from '../../post/schemas/post.schema';
import { MongooseArray } from '../../mongoose-array.types';
import { Community } from '../../community/schemas/community.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  login: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: number;

  @Prop()
  surname: string;

  @Prop()
  lastname: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  town: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends: MongooseArray<User>;

  // @Prop()
  // isActivated: boolean;

  // @Prop()
  // activationLink: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dialogue' }] })
  dialogue: MongooseArray<DialogueDocument>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: MongooseArray<Post>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }] })
  communities: MongooseArray<Community>;

  @Prop([String])
  imageFiles: MongooseArray<string>;

  @Prop({
    type: [
      {
        title: { type: String },
        path: { type: String },
      },
    ],
  })
  audioFiles: MongooseArray<{
    title: string;
    path: string;
  }>;

  @Prop({
    type: [
      {
        title: { type: String },
        path: { type: String },
      },
    ],
  })
  videoFiles: MongooseArray<{
    title: string;
    path: string;
  }>;
}

export const UserSchema = SchemaFactory.createForClass(User);
