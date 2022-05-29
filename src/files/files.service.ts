import { Injectable } from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class FilesService {
  uploadImage(user: UserDocument, file: Express.Multer.File) {
    user.imageFiles.push(file.filename);
    return user.save();
  }

  async uploadAudio(user: UserDocument, file: Express.Multer.File) {
    user.audioFiles.push(file.filename);
    return user.save();
  }
}
