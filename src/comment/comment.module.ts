import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, JwtAuthGuard],
  exports: [],
})
export class CommentModule {}
