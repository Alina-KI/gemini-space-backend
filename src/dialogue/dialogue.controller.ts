import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { DialogueService } from './dialogue.service';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { Message } from './schemas/message.schema';

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

  @Post('addMessage')
  addMessage(@Body() message: Message) {
    return this.dialogueService.addMessage(message);
  }
}
