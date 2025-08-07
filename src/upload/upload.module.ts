import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express'
import { Upload } from './entities/upload.entity'
import { diskStorage } from 'multer'
import { extname, join } from 'path';
import { RedisService } from '../common/redis'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: 'uploads', // 设置上传文件的路径
      filename: (_, file, callback) => {
        const fileName = `${new Date().getTime() + extname(file.originalname)}`
        return callback(null, fileName)
      }
    })
  }), TypeOrmModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [UploadService, RedisService]
})
export class UploadModule { }