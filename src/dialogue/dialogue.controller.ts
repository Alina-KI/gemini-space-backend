import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { DialogueService } from './dialogue.service';
import { JwtAuthGuard, User } from '../jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('/dialogues')
export class DialogueController {
  constructor(private dialogueService: DialogueService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findDialogue(@Param('id') id: ObjectId) {
    return this.dialogueService.findDialogue(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getMyDialogs(@User() user: UserDocument) {
    return this.dialogueService.getUserDialogs(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getDialog/:dialogId')
  getDialog(@User() user: UserDocument, @Param('dialogId') dialogId: string) {
    return this.dialogueService.getDialog(user, dialogId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getUserDialog/:dialogId')
  getUserDialog(
    @User() user: UserDocument,
    @Param('dialogId') dialogId: string,
  ) {
    return this.dialogueService.getUserDialog(user, dialogId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteDialogue(@Param('id') id: ObjectId) {
    return this.dialogueService.deleteDialogue(id);
  }
}
