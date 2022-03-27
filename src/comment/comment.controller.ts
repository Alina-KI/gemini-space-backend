import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ChangeCommentDto, CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard, User } from '../jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  likeComment(@Param('id') id: string, @User() user: UserDocument) {
    return this.commentService.likeComment(id, user);
  }

  @Get(':id')
  changeComment(@Param('id') id: string, @Body() dto: ChangeCommentDto) {
    return this.commentService.changeComment(id, dto);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }
}
