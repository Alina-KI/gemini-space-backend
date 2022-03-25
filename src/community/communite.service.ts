import { Community, CommunityDocument } from './schemas/community.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(Community.name) private userModel: Model<CommunityDocument>,
  ) {}
}
