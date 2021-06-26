import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { DialogueService } from './dialogue.service';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
// import { CreateMessageDto } from "./dto/create-message.dto";

@Controller('/dialogues')
export class DialogueController {
  constructor(private dialogueService: DialogueService) {}

  @Post()
  create(@Body() dto: CreateDialogueDto) {
    return this.dialogueService.create(dto);
  }

  @Get()
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

  // @Post("/message")
  // addMessage(@Body() dto: CreateMessageDto) {
  //   return this.addMessage(dto);
  // }
  //
  // @Post("/message/:id")
  // changeMessage(@Param("id") id: ObjectId) {
  //   return this.changeMessage(id);
  // }
}
