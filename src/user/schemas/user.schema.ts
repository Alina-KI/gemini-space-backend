import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { DialogueDocument } from '../../dialogue/schemas/dialogue.schema';
import { Post } from '../../post/schemas/post.schema';
import { MongooseArray } from '../../mongoose-array.types'

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
  dialogue: DialogueDocument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
