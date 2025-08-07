import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Param, Query } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express'
import { RedisService } from '../common/redis'
import { Role } from '../common/role.decorator'
import {
  rename,
  existsSync,
  mkdirSync,
  appendFileSync,
  readFileSync,
  unlinkSync
} from 'fs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@Controller('upload')
@ApiTags('上传文件')
export class UploadController {
  constructor(private readonly uploadService: UploadService,
    private readonly redisService: RedisService) { }
  @Post('album')
  @ApiOperation({ summary: '上传图片' })
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return { data: '/img/' + file.filename }
  }
  @Post('filequery')
  @ApiOperation({ summary: '查询文件是否上传过' })
  async filequery(@Body() body) {
    const { fileName, fileHash, total } = body || {};
    const chunkDir = 'uploads/' + fileName.split(".").pop();
    const hash = await this.redisService.getValue(fileName)
    // 如果通过则说明该文件已上传过就直接返回地址
    if (existsSync(`${chunkDir}/${fileName}`) && hash == fileHash) {
      return { data: '/files/' + fileName.split(".").pop() + '/' + fileName }
    } else {
      let index = 0;
      // 获取文件切片已上传的索引
      for (let i = 0; i < total; i++) {
        if (!existsSync(`${chunkDir}/${fileHash}-${i}`)) {
          index = i
          break;
        }
      }
      return { data: String(index) }
    }
  }
  @Post('fileUpload')
  @ApiOperation({ summary: '切片文件上传' })
  @UseInterceptors(FileInterceptor('file'))
  fileUpload(@UploadedFile() file, @Body() body) {
    const { fileName, fileHash, chunkIndex, total } = body || {};
    const chunkDir = 'uploads/' + fileName.split(".").pop();
    if (!existsSync(chunkDir)) {
      mkdirSync(chunkDir);
    }
    rename(file.path, `${chunkDir}/${fileHash}-${chunkIndex}`, (err) => {
      if (err) {
        console.log('err', err);
      } else {
        console.log('上传成功');
      }
    });
    return { data: (+chunkIndex + 1) / +total, message: `切片${chunkIndex}上传成功` }
  }

  @Post('fileMerge')
  @ApiOperation({ summary: '合并切片文件' })
  fileMerge(@Body() body) {
    const { fileHash, fileName, total } = body;
    const mergePathArr = [];
    const chunkDir = 'uploads/' + fileName.split(".").pop();
    // 找出所有切片文件
    for (let i = 0; i < total; i++) {
      mergePathArr.push(`${chunkDir}/${fileHash}-${i}`);
    }
    // 合并切片文件
    mergePathArr.forEach((path) => {
      const content = readFileSync(path);
      appendFileSync(`${chunkDir}/${fileName}`, content);
    });
    this.redisService.setValue(fileName, fileHash)
    // 删除切片文件
    mergePathArr.forEach((path) => {
      unlinkSync(path);
    })
    return { data: '/files/' + fileName.split(".").pop() + '/' + fileName }
  }

  @Get('fileList')
  @ApiOperation({ summary: '获取文件列表' })
  fileList(@Query() params: { fileType: string | number, fileName: string }) {
    return this.uploadService.fileList(params);
  }
  @Post('fileDelete')
  @ApiOperation({ summary: '删除文件' })
  fileDelete( @Role(["role_admin"]) @Body() body) {
    return this.uploadService.fileDelete(body);
  }
  @Post('fileRename')
  @ApiOperation({ summary: '修改文件名' })
  fileRename( @Role(["role_admin"]) @Body() body) {
    return this.uploadService.fileRename(body);
  }
}