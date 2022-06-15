import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard, User } from '../jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('/post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createComment(@Body() dto: CreatePostDto, @User() user: UserDocument) {
    return this.postService.createCommunity(dto, user);
  }
}
