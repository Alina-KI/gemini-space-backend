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

  async create(dto: CreateMessageDto): Promise<Message> {
    return this.messageModel.create({ ...dto, picture: '', file: '' });
  }

  async changeMessage(id: ObjectId, changeText: string): Promise<Message> {
    await this.messageModel
      .updateOne(
        { _id: id },
        {
          $push: {
            items: {
              text: changeText,
            },
          },
        },
      )
      .exec();
    return this.messageModel.findById(id);
  }

  async deleteMessage(id: ObjectId): Promise<ObjectId> {
    const message = await this.messageModel.findByIdAndDelete(id);
    return message._id;
  }
}
