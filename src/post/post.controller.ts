import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard, User } from '../jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { ObjectId } from 'mongoose';

@Controller('/post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create/:id')
  createComment(
    @Body() dto: CreatePostDto,
    @User() user: UserDocument,
    @Param('id') id: ObjectId,
  ) {
    return this.postService.createPost(dto, user, id);
  }

  @Get('/getPosts/:id')
  getPosts(@Param('id') id: ObjectId) {
    return this.postService.getPosts(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/changeLikes')
  changeLikes(@Body() id: string, @User() user: UserDocument) {
    return this.postService.changeLikes(id, user);
  }
}
