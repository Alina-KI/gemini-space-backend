import { Module } from '@nestjs/common';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dialogue, DialogueSchema } from './schemas/dialogue.schema';
import { EventsGateway } from './events.gateway';
import { WsJwtAuthGuard } from './guards/ws-jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../user/token.module';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dialogue.name, schema: DialogueSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
    TokenModule,
  ],
  controllers: [DialogueController],
  providers: [DialogueService, EventsGateway, WsJwtAuthGuard],
})
export class DialogueModule {}
