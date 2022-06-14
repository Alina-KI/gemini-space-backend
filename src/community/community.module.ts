import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from './schemas/community.schema';
import { CommunityController } from './community.controller';
import { CommunityService } from './communite.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Community.name, schema: CommunitySchema },
    ]),
    UserModule,
  ],
  controllers: [CommunityController],
  providers: [CommunityService, JwtAuthGuard],
  exports: [],
})
export class CommunityModule {}
