import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from "@nestjs/websockets";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Server } from "socket.io";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UseGuards } from "@nestjs/common";
import { WsJwtAuthGuard } from "./guards/ws-jwt-auth.guard";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("events")
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: "events", data: item }))
    );
  }

  @SubscribeMessage("identity")
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage("sendMessage")
  async sendMessage(@MessageBody() sender: CreateUserDto, idDialogue: string, nameDialogue: string) {
    const user = await this.userModel.findOne({ id: sender.id })
    if(user){
      const dialogue = user.dialogue.findOne({ id: idDialogue })
      if(dialogue){

      }
      else{
        dialogue.createDialogue()
      }
    }
  }

  @SubscribeMessage("receiveMessage")
  async receiveMessage(@MessageBody() data: number) {

  }
}
