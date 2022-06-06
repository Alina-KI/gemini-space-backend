import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, User } from '../jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('/files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload/images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async uploadImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @User() user: UserDocument,
  ) {
    for (const file of files) {
      await this.filesService.uploadImage(user, file);
    }

    return user;
  }

  @Post('upload/audio')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async uploadAudio(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @User() user: UserDocument,
    title: string,
  ) {
    for (const file of files) {
      await this.filesService.uploadAudio(user, file, title);
    }

    return user;
  }

  @Post('upload/video')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async uploadVideo(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @User() user: UserDocument,
    title: string,
  ) {
    for (const file of files) {
      await this.filesService.uploadVideo(user, file, title);
    }

    return user;
  }
}
