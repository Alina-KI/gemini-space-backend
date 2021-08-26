import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Dialogue, DialogueDocument } from './schemas/dialogue.schema';
import { CreateDialogueDto } from './dto/create-dialogue.dto';

@Injectable()
export class DialogueService {
  constructor(
    @InjectModel(Dialogue.name) private dialogueModel: Model<DialogueDocument>,
  ) {}

  async createDialogue(dto: CreateDialogueDto): Promise<Dialogue> {
    return this.dialogueModel.create({ ...dto, message: [], users: [] });
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
}
