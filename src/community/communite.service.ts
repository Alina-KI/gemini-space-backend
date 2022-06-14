import { Community, CommunityDocument } from './schemas/community.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(Community.name)
    private communityModel: Model<CommunityDocument>,
  ) {}

  async createCommunity(dto: CreateCommunityDto) {
    return this.communityModel.create({ ...dto });
  }

  async deleteCommunity(id: string) {
    const comment = await this.communityModel.findByIdAndDelete(id);
    return comment._id;
  }

  async getCommunities(me: UserDocument) {
    await me.populate('communities').execPopulate();
    return me.communities;
  }

  async getNotCommunities(me: UserDocument) {
    await me.populate('communities').execPopulate();
    return this.communityModel.find({ _id: { $nin: me.communities } });
  }
}
