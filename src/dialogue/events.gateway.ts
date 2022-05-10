import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { WithUser, WsJwtAuthGuard } from './guards/ws-jwt-auth.guard';
import { SendMessageDto } from './dto/send-message.dto';
import { DialogueService } from './dialogue.service';
import {
  CreateDialogueDto,
  CreateGroupDialogDto,
} from './dto/create-dialogue.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  sockets: { [userLogin: string]: WithUser<Socket> } = {};

  constructor(private dialogueService: DialogueService) {}

  getDialogName = (dialogId) => `dialog-${dialogId}`;

  connectToDialog(client: Socket, dialogId: string) {
    client.join(this.getDialogName(dialogId));
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('connectAllDialogs')
  async connectAllDialogs(client: WithUser<Socket>) {
    console.log('connection');
    this.sockets[client.user.login] = client;
    client.user.populate('dialogue').dialogue.forEach((dialog) => {
      this.connectToDialog(client, dialog._id);
    });
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('createDialog')
  async createDialog(client: WithUser<Socket>, dto: CreateDialogueDto) {
    const dialog = await this.dialogueService.getOrCreateDialogue(
      dto,
      client.user,
    );
    this.connectToDialog(client, dialog._id);
    if (this.sockets[dto.anotherUserLogin]) {
      this.connectToDialog(this.sockets[dto.anotherUserLogin], dialog._id);
    }
    return dialog;
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('createGroupDialog')
  async createGroupDialog(client: WithUser<Socket>, dto: CreateGroupDialogDto) {
    const dialog = await this.dialogueService.getOrCreateDialogue(
      dto,
      client.user,
    );
    this.connectToDialog(client, dialog._id);
    return dialog;
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('sendMessage')
  async sendMessage(client: WithUser<Socket>, data: SendMessageDto) {
    const dialog = client.user.dialogue.find(
      (d) => d._id.toString() === data.dialogId,
    );
    if (!dialog) {
      throw new NotFoundException('Такого диалога нет');
    }
    const savedMessage = await this.dialogueService.addMessage(
      data,
      client.user,
    );
    if (dialog.isForOnlyCreator) {
      dialog.isForOnlyCreator = false;
      dialog.save().then();
    }
    this.server
      .in(this.getDialogName(data.dialogId))
      .emit('receiveMessage', { dialogId: dialog._id, savedMessage });
  }

  handleDisconnect(client: Socket) {
    const userLogin = Object.keys(this.sockets).find(
      (userLogin) => this.sockets[userLogin].id === client.id,
    );
    delete this.sockets[userLogin];
  }
}
