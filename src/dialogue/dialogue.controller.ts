import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { DialogueService } from './dialogue.service';

@Controller('/dialogues')
export class DialogueController {
  constructor(private dialogueService: DialogueService) {}

  @Get(':id')
  findDialogue(@Param('id') id: ObjectId) {
    return this.dialogueService.findDialogue(id);
  }

  @Delete(':id')
  deleteDialogue(@Param('id') id: ObjectId) {
    return this.dialogueService.deleteDialogue(id);
  }
}
