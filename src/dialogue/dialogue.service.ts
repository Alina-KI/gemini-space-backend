import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Dialogue, DialogueDocument } from './schemas/dialogue.schema';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { Message } from './schemas/message.schema';

@Injectable()
export class DialogueService {
  constructor(
    @InjectModel(Dialogue.name) private dialogueModel: Model<DialogueDocument>,
  ) {}

  async createDialogue(dto: CreateDialogueDto): Promise<Dialogue> {
    return this.dialogueModel.create({ ...dto, message: [], users: [] });
  }

  async findDialogue(id: ObjectId): Promise<Dialogue[]> {
    return this.dialogueModel.find({ _id: id });
  }

  async deleteDialogue(id: ObjectId): Promise<ObjectId> {
    const dialogue = await this.dialogueModel.findByIdAndDelete(id);
    return dialogue._id;
  }

  async addMessage(message: Message): Promise<Dialogue[]> {
    await this.dialogueModel
      .updateOne(
        { _id: message._idDialogue },
        {
          $push: {
            items: {
              messages: message,
            },
          },
        },
      )
      .exec();
    return this.dialogueModel.find({ _id: message._idDialogue });
  }
}
