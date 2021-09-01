import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('/message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('add')
  addMessage(@Body() dto: CreateMessageDto) {
    return this.messageService.create(dto);
  }

  @Post(':id')
  changeMessage(@Param('id') id: ObjectId, changeText: string) {
    return this.messageService.changeMessage(id, changeText);
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: ObjectId) {
    return this.messageService.deleteMessage(id);
  }
}
