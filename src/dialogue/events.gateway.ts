import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { Res, UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from './guards/ws-jwt-auth.guard';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('connectAllDialogs')
  async connectAllDialogs(client: Socket) {
    console.log('connection');
    client.join(`dialog-${(client as any).user.}`);
  }

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }
  //
  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('sendMessage')
  async sendMessage(client, data: SendMessageDto) {
    console.log('data', data);
    console.log('client', client.user);
    // const dialogue = client.user.dialogue.findOne({ id: data.dialog });
    // if (dialogue) {
    // } else {
    //   dialogue.createDialogue();
    // }
  }
}
