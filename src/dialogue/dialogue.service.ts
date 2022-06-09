import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Dialogue, DialogueDocument } from './schemas/dialogue.schema';
import {
  CreateDialogueDto,
  CreateGroupDialogDto,
} from './dto/create-dialogue.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class DialogueService {
  constructor(
    @InjectModel(Dialogue.name) private dialogueModel: Model<DialogueDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getUserDialogs(user: UserDocument) {
    await user.populate('dialogue').execPopulate();
    const dialogs = await user.dialogue.filter(async (dialog) => {
      await dialog.populate('creator').execPopulate();
      await dialog.populate('messages').execPopulate();
      return !dialog.isForOnlyCreator || dialog.creator.login === user.login;
    });

    await Promise.all(dialogs.map((d) => d.populate('users').execPopulate()));

    return dialogs;
  }

  async getDialog(me: UserDocument, dialogId: string) {
    await me.populate('dialogue').execPopulate();
    const dialog = me.dialogue.find(async (dialog) => {
      return dialog._id.toString() === dialogId;
    });
    if (!dialog) {
      throw new NotFoundException();
    }
    await dialog.populate(' messages.sender').execPopulate();
    return dialog;
  }

  async getOrCreateDialogue(
    dto: CreateDialogueDto | CreateGroupDialogDto,
    user: UserDocument,
  ) {
    const users =
      'anotherUserLogin' in dto
        ? [user, await this.userModel.findOne({ login: dto.anotherUserLogin })]
        : [user];
    const isDialog = 'anotherUserLogin' in dto;

    const existingDialog = await this.dialogueModel.findOne({
      users,
    });
    if (existingDialog) {
      existingDialog.isForOnlyCreator = false;
      existingDialog.save();
      return existingDialog;
    }

    const createdDialog = await this.dialogueModel.create({
      nameTalk: dto.nameTalk,
      creator: user._id,
      users,
      messages: [],
      isForOnlyCreator: isDialog,
      isGroup: !isDialog,
      image: dto.image,
    });

    users.forEach((user) => {
      user.dialogue.push({ _id: createdDialog._id });
      user.save();
    });
    return createdDialog;
  }

  async findDialogue(id: ObjectId): Promise<Dialogue[]> {
    return this.dialogueModel.find({ _id: id });
  }

  async deleteDialogue(id: ObjectId): Promise<ObjectId> {
    const dialogue = await this.dialogueModel.findByIdAndDelete(id);
    return dialogue._id;
  }

  async addMessage(
    { dialogId, ...message }: SendMessageDto,
    sender: UserDocument,
  ) {
    const dialog = await this.dialogueModel.findOne({ _id: dialogId });
    dialog.messages.push({ ...message, sender });
    await dialog.save();
    dialog.populate('messages.sender').execPopulate();
    return dialog.messages[dialog.messages.length - 1];
  }
}
