import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from './schemas/community.schema';
import { CommunityController } from './community.controller';
import { CommunityService } from './communite.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Community.name, schema: CommunitySchema },
    ]),
  ],
  controllers: [CommunityController],
  providers: [CommunityService],
  exports: [],
})
export class CommunityModule {}
