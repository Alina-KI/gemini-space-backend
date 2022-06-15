import { Post, PostDocument } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../user/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createCommunity(dto: CreatePostDto, user: UserDocument) {
    dto.creator = user.login;
    const group = await this.postModel.create({ ...dto });

    return group;
  }
}
