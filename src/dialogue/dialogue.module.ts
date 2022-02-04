import { Module } from '@nestjs/common';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dialogue, DialogueSchema } from './schemas/dialogue.schema';
import { EventsGateway } from './events.gateway';
import { UserService } from '../user/user.service';
import { WsJwtAuthGuard } from './guards/ws-jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dialogue.name, schema: DialogueSchema },
    ]),
    UserService,
    JwtService,
  ],
  controllers: [DialogueController],
  providers: [DialogueService, EventsGateway, WsJwtAuthGuard],
})
export class DialogueModule {}
