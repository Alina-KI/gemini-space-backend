import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard, User } from '../jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createComment(@Body() dto: CreateCommentDto, @User() user: UserDocument) {
    return this.commentService.createComment(dto, user);
  }
}
