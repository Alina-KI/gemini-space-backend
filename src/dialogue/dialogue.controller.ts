import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { DialogueService } from './dialogue.service';
import { CreateDialogueDto } from './dto/create-dialogue.dto';

@Controller('/dialogues')
export class DialogueController {
  constructor(private dialogueService: DialogueService) {}

  @Post('addDialogue')
  create(@Body() dto: CreateDialogueDto) {
    return this.dialogueService.createDialogue(dto);
  }

  @Get('getAll')
  getAll() {
    return this.dialogueService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.dialogueService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.dialogueService.delete(id);
  }
}
