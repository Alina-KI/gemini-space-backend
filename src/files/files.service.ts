import { Injectable } from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class FilesService {
  async uploadImage(user: UserDocument, file: Express.Multer.File) {
    user.imageFiles.push(file.filename);
    await user.save();
    return file.filename;
  }

  async uploadAudio(
    user: UserDocument,
    file: Express.Multer.File,
    title: string,
  ) {
    user.audioFiles.push({ title, path: file.filename });
    await user.save();
    return file.filename;
  }

  async uploadVideo(
    user: UserDocument,
    file: Express.Multer.File,
    title: string,
  ) {
    user.videoFiles.push({ title, path: file.filename });
    await user.save();
    return file.filename;
  }
}
