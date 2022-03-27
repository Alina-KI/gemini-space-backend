import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ChangeCommentDto, CreateCommentDto } from './dto/create-comment.dto';

@Controller('/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
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
