// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { SendMessageDto } from './dto/create-dialogue.dto';
//
// @WebSocketGateway()
// export class ChatGateway {
//   @WebSocketServer()
//   private server: Server;
//
//   @SubscribeMessage('message')
//   handleMessage(client: Socket, sendMessageDto: SendMessageDto): void {
//     const { id, ...message } = sendMessageDto;
//     this.server.to(id).emit('message', message);
//   }
// }
