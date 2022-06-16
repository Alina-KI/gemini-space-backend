import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from '../user/user.module';
import {
  Community,
  CommunitySchema,
} from '../community/schemas/community.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Community.name, schema: CommunitySchema },
    ]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
