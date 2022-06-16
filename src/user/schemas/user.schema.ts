import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { DialogueDocument } from '../../dialogue/schemas/dialogue.schema';
import { PostDocument } from '../../post/schemas/post.schema';
import { MongooseArray } from '../../mongoose-array.types';
import { CommunityDocument } from '../../community/schemas/community.schema';

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

  @Prop()
  avatar: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends: MongooseArray<UserDocument>;

  // @Prop()
  // isActivated: boolean;

  // @Prop()
  // activationLink: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dialogue' }] })
  dialogue: MongooseArray<DialogueDocument>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: MongooseArray<PostDocument>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }] })
  communities: MongooseArray<CommunityDocument>;

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

  @Prop([String])
  videoFiles: MongooseArray<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
