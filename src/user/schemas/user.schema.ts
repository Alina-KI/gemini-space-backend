import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Dialogue } from '../../dialogue/schemas/dialogue.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  login: string;

  @Prop()
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

  // @Prop()
  // isActivated: boolean;

  // @Prop()
  // activationLink: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dialogue' }] })
  dialogue: Dialogue[];
}

export const UserSchema = SchemaFactory.createForClass(User);
