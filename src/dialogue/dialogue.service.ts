import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { Dialogue, DialogueDocument } from './schemas/dialogue.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateDialogueDto } from './dto/create-dialogue.dto';

@Injectable()
export class DialogueService {
  constructor(
    @InjectModel(Dialogue.name) private dialogueModel: Model<DialogueDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(dto: CreateDialogueDto): Promise<Dialogue> {
    return this.dialogueModel.create({ ...dto });
  }

  async getAll(): Promise<Dialogue[]> {
    return this.dialogueModel.find();
  }

  async getOne(id: ObjectId): Promise<Dialogue> {
    return this.dialogueModel.findById(id);
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const dialogue = await this.dialogueModel.findByIdAndDelete(id);
    return dialogue._id;
  }

  async addMessage(dto: CreateMessageDto): Promise<Message> {
    return this.messageModel.create({ ...dto, picture: '', file: '' });
  }

  // async changeMessage(id: ObjectId): Promise<Message>{
  //     return this.messageModel.findById(id)
  // }
}
