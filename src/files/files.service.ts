import { Injectable } from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class FilesService {
  async uploadImage(user: UserDocument, file: Express.Multer.File) {
    user.imageFiles.push({ path: file.filename });
    return user.save();
  }

  async uploadAudio(
    user: UserDocument,
    file: Express.Multer.File,
    title: string,
  ) {
    user.audioFiles.push({ title, path: file.filename });
    return user.save();
  }

  async uploadVideo(
    user: UserDocument,
    file: Express.Multer.File,
    title: string,
  ) {
    user.videoFiles.push({ title, path: file.filename });
    return user.save();
  }
}
