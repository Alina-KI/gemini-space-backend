import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async addMessage(dto: CreateMessageDto): Promise<Message> {
    return this.messageModel.create({ ...dto, picture: '', file: '' });
  }

  async changeMessage(id: ObjectId): Promise<Message> {
    return this.messageModel.findById(id);
  }
}
