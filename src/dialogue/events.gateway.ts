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
  sockets: { [userId: string]: WithUser<Socket> } = {};

  constructor(private dialogueService: DialogueService) {}

  getDialogName = (dialogId) => `dialog-${dialogId}`;

  connectToDialog(client: Socket, dialogId: string) {
    client.join(this.getDialogName(dialogId));
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('getDialog')
  async getDialog(client: WithUser<Socket>, dialogId: string) {
    const dialog = client.user.dialogue.find(
      (dialog) => dialog._id === dialogId,
    );
    if (!dialog) {
      throw new NotFoundException();
    }
    return dialog;
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('connectAllDialogs')
  async connectAllDialogs(client: WithUser<Socket>) {
    console.log('connection');
    this.sockets[client.user._id] = client;
    client.user.dialogue.forEach((dialog) =>
      this.connectToDialog(client, dialog._id),
    );
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('createDialog')
  async createDialog(client: WithUser<Socket>, dto: CreateDialogueDto) {
    const dialog = await this.dialogueService.createDialogue(dto, client.user);
    this.connectToDialog(client, dialog._id);
    this.connectToDialog(this.sockets[dto.anotherUserId], dialog._id);
    return dialog;
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('createGroupDialog')
  async createGroupDialog(client: WithUser<Socket>, dto: CreateGroupDialogDto) {
    const dialog = await this.dialogueService.createDialogue(dto, client.user);
    this.connectToDialog(client, dialog._id);
    return dialog;
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('sendMessage')
  async sendMessage(client: WithUser<Socket>, data: SendMessageDto) {
    console.log('data', data);
    console.log('client', client.user);
    const dialog = client.user.dialogue.find((d) => d.id === data.dialogId);
    if (!dialog) {
      throw new NotFoundException('Такого диалога нет');
    }
    const savedMessage = await this.dialogueService.addMessage(data);
    this.server
      .in(this.getDialogName(data.dialogId))
      .emit('receiveMessage', { dialogId: dialog._id, savedMessage });
  }

  handleDisconnect(client: Socket) {
    const userId = Object.keys(this.sockets).find(
      (userId) => this.sockets[userId].id === client.id,
    );
    delete this.sockets[userId];
  }
}
