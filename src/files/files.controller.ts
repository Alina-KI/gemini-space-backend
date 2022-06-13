import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard, User } from '../jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('/files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  uploadImages(
    @UploadedFile() image: Express.Multer.File,
    @User() user: UserDocument,
  ) {
    return this.filesService.uploadImage(user, image);
  }

  @Post('upload/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @User() user: UserDocument,
  ) {
    return this.filesService.uploadAvatar(user, avatar);
  }

  @Post('upload/audio')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('audio'))
  uploadAudio(
    @UploadedFile() audio: Express.Multer.File,
    @User() user: UserDocument,
    @Body('title') title: string,
  ) {
    return this.filesService.uploadAudio(user, audio, title);
  }

  @Post('upload/video')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  uploadVideo(
    @UploadedFile() video: Express.Multer.File,
    @User() user: UserDocument,
    @Body('title') title: string,
  ) {
    return this.filesService.uploadVideo(user, video, title);
  }
}
