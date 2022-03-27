import { CommentDocument } from './schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ChangeCommentDto, CreateCommentDto } from './dto/create-comment.dto';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createComment(dto: CreateCommentDto) {
    return this.commentModel.create({ ...dto, likes: [] });
  }

  async deleteComment(id: string) {
    const comment = await this.commentModel.findByIdAndDelete(id);
    return comment._id;
  }

  async changeComment(id: string, dto: ChangeCommentDto) {
    const comment = await this.commentModel.findOne({ _id: id });
    comment.text = dto.text;
    comment.datePublished = dto.datePublished;
    comment.save();
  }

  async likeComment(id: string, user: UserDocument) {
    return this.commentModel
      .updateOne(
        { _id: id },
        {
          $push: {
            items: { likes: user },
          },
        },
      )
      .exec();
  }
}
