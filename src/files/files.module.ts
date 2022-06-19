import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MulterModule.register({
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
