import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { DialogueService } from './dialogue.service';
import { CreateDialogueDto } from './dto/create-dialogue.dto';

export type Message = {
  _idSender: string;
  text: string;
  picture: string | null;
  file: string | null;
  data: string;
};

@Controller('/dialogues')
export class DialogueController {
  constructor(private dialogueService: DialogueService) {}

  @Post('addDialogue')
  createDialogue(@Body() dto: CreateDialogueDto) {
    return this.dialogueService.createDialogue(dto);
  }

  @Get(':id')
  findDialogue(@Param('id') id: ObjectId) {
    return this.dialogueService.findDialogue(id);
  }

  @Delete(':id')
  deleteDialogue(@Param('id') id: ObjectId) {
    return this.dialogueService.deleteDialogue(id);
  }

  @Post('message/addMessage/:id')
  addMessage(@Body() message: Message, id: string) {
    return this.dialogueService.addMessage(message, id);
  }

  // @Post('message/change/:id')
  // changeMessage(@Param('id') id: ObjectId, changeText: string) {
  //   return this.messageService.changeMessage(id, changeText);
  // }
  //
  // @Delete('message/:id')
  // deleteMessage(@Param('id') id: ObjectId) {
  //   return this.messageService.deleteMessage(id);
  // }
}
