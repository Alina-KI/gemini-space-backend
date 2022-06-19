import { Injectable } from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class FilesService {
  async uploadImage(user: UserDocument, file: Express.Multer.File) {
    user.imageFiles.push(`http://localhost:5000/${file.filename}`);
    await user.save();
    return `http://localhost:5000/${file.filename}`;
  }

  async uploadFile(user: UserDocument, file: Express.Multer.File) {
    user.files.push(`http://localhost:5000/${file.filename}`);
    await user.save();
    return `http://localhost:5000/${file.filename}`;
  }

  async uploadAvatar(user: UserDocument, file: Express.Multer.File) {
    user.avatar = `http://localhost:5000/${file.filename}`;
    await user.save();
    return `http://localhost:5000/${file.filename}`;
  }

  async uploadAudio(
    user: UserDocument,
    file: Express.Multer.File,
    title: string,
  ) {
    user.audioFiles.push({
      title,
      path: `http://localhost:5000/${file.filename}`,
    });
    await user.save();
    return { title, path: `http://localhost:5000/${file.filename}` };
  }

  async uploadVideo(user: UserDocument, file: Express.Multer.File) {
    user.videoFiles.push(`http://localhost:5000/${file.filename}`);
    await user.save();
    return `http://localhost:5000/${file.filename}`;
  }
}
