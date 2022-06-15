import { Comment, CommentDocument } from './schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createComment(dto: CreateCommentDto, user: UserDocument) {
    return this.commentModel.create({ ...dto, likes: [] });
  }
}
