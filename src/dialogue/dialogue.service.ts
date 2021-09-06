import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Dialogue, DialogueDocument } from './schemas/dialogue.schema';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { Message } from './dialogue.controller';

@Injectable()
export class DialogueService {
  constructor(
    @InjectModel(Dialogue.name) private dialogueModel: Model<DialogueDocument>,
  ) {}

  async createDialogue(dto: CreateDialogueDto): Promise<Dialogue> {
    return this.dialogueModel.create({ ...dto, messages: [], users: [] });
  }

  async findDialogue(id: ObjectId): Promise<Dialogue[]> {
    return this.dialogueModel.find({ _id: id });
  }

  async deleteDialogue(id: ObjectId): Promise<ObjectId> {
    const dialogue = await this.dialogueModel.findByIdAndDelete(id);
    return dialogue._id;
  }

  async addMessage(message: Message, id: string): Promise<Dialogue[]> {
    await this.dialogueModel
      .updateOne({ _id: id }, { $push: { items: { messages: message } } })
      .exec();
    const dialogue = await this.dialogueModel.find({
      _id: id,
    });
    // console.log(message);
    // console.log(dialogue[0].messages);
    dialogue[0].messages.push(message);
    dialogue[0].markModified('messages');
    dialogue[0].save();
    return this.dialogueModel.find({ _id: id });
  }

  // async changeMessage(
  //   idDialogue: ObjectId,
  //   idMessage: ObjectId,
  //   changeText: string,
  // ) {
  //   const dialogue = await this.dialogueModel.find({ _id: idDialogue });
  //   dialogue.messages
  //     .updateOne(
  //       { _id: idMessage },
  //       {
  //         $push: {
  //           items: {
  //             text: changeText,
  //           },
  //         },
  //       },
  //     )
  //     .exec();
  //   return this.dialogueModel.findById(idDialogue);
  // }

  // async deleteMessage(id: ObjectId): Promise<ObjectId> {
  //   const message = await this.messageModel.findByIdAndDelete(id);
  //   return message._id;
  // }
}
