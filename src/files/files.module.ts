import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import path, { join } from 'path';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserModule } from '../user/user.module';
import multer from 'multer';

@Module({
  imports: [
    MulterModule.register({
      // storage: multer.diskStorage({
      //   destination: function (req, file, cb) {
      //     cb(null, 'uploads/');
      //   },
      //   filename: function (req, file, cb) {
      //     cb(null, Date.now() + path.extname(file.originalname));
      //   },
      // }),
      dest: 'uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
    }),
    UserModule,
  ],
  providers: [FilesService, JwtAuthGuard],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
