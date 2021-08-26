import { Body, Controller, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('/message')
export class DialogueController {
  constructor(private messageService: MessageService) {}

  @Post('add')
  addMessage(@Body() dto: CreateMessageDto) {
    return this.messageService.addMessage(dto);
  }

  @Post(':id')
  changeMessage(@Param('id') id: ObjectId) {
    return this.messageService.changeMessage(id);
  }
}
