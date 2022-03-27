import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Dialogue, DialogueDocument } from './schemas/dialogue.schema';
import {
  CreateDialogueDto,
  CreateGroupDialogDto,
} from './dto/create-dialogue.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class DialogueService {
  constructor(
    @InjectModel(Dialogue.name) private dialogueModel: Model<DialogueDocument>,
  ) {}

  async createDialogue(
    dto: CreateDialogueDto | CreateGroupDialogDto,
    user: UserDocument,
  ) {
    const users =
      'anotherUserId' in dto ? [user._id, dto.anotherUserId] : [user._id];

    return this.dialogueModel.create({
      nameTalk: dto.nameTalk,
      creator: user._id,
      users,
      messages: [],
    });
  }

  async findDialogue(id: ObjectId): Promise<Dialogue[]> {
    return this.dialogueModel.find({ _id: id });
  }

  async deleteDialogue(id: ObjectId): Promise<ObjectId> {
    const dialogue = await this.dialogueModel.findByIdAndDelete(id);
    return dialogue._id;
  }

  async addMessage(message: SendMessageDto) {
    const result = await this.dialogueModel
      .updateOne(
        { _id: message.dialogId },
        { $push: { items: { messages: message } } },
      )
      .exec();
    // console.log('result', result);

    return message;
  }
}
