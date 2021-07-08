import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Dialogue } from '../../dialogue/schemas/dialogue.schema';
// import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
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

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dialogue' }] })
  // dialogue: Dialogue[];
}

export const UserSchema = SchemaFactory.createForClass(User);
