import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Upload } from './entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const fs = require('fs')
const path = require('path');
@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly upload: Repository<Upload>,
  ) { }

  getAllFilesInfo(dirPath) {
    function traverseDirectory(currentPath) {
      const items = fs.readdirSync(currentPath);
      const itemsInfo = [];
      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stat = fs.statSync(itemPath);
        const itemInfo = {
          name: item,
          path: itemPath.replace('uploads', ''),
          size: stat.size,
          updateTime: stat.ctime,
          isDir: stat.isDirectory(),
          extendName: item.match(/\.([^.]+)$/) && item.match(/\.([^.]+)$/)[1],
          children: []
        };
        if (itemInfo.isDir) {
          itemInfo.children = traverseDirectory(itemPath);
        }
        itemsInfo.push(itemInfo);
      }

      return itemsInfo;
    }

    return traverseDirectory(dirPath);
  }
  getList(type: number | string, fileList) {
    const FileMap = {
      1: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
      2: ['txt', 'doc', 'xls', 'ppt', 'md', 'pdf', 'docx', 'xlsx', 'pptx', 'md'],
      3: ['less', 'ts', 'jsx', 'css', 'js', 'html', 'vue', 'json', 'sql'],
      4: ['mp4'],
      5: ['mp3', 'flac'],
      6: ['zip', 'rar', 'gz', 'tar'],
    }
    let FileMapArr = Object.keys(FileMap)
    // let fileTypes = FileMapArr.map((item) => [])
    // FileMapArr.forEach((item, index) => {
    //   FileMap[item].forEach((i) => {
    //     const items = fileList.filter((element) => element.extendName === i)
    //     fileTypes[index].push(...items)
    //   })
    // })
    // const sizes = []
    // fileTypes.forEach((item, index) => {
    //   sizes[index] = item.reduce((pre, cur) => pre + cur.size, 0)
    // })
    const sizes = FileMapArr.map((item) => {
      return FileMap[item].reduce((totalSize, fileType) => {
        const items = fileList.filter((element) => element.extendName === fileType);
        return totalSize + items.reduce((total, file) => total + file.size, 0);
      }, 0);
    });
    if (Number(type) === 0) return { res: fileList, sizes }
    const res: any[] = []
    const arr = FileMap[type as keyof typeof FileMap] || []
    arr.forEach((item) => {
      const data = fileList.filter((i) => i.extendName === item)
      res.push(...data)
    })
    return { res, sizes }
  }
  /** 获取文件列表 */
  async fileList(params: { fileType: string | number, fileName: string }) {
    const folderPath = 'uploads';
    const itemsInfo = this.getAllFilesInfo(folderPath);
    // 拍平数组
    function flattenArray(arr) {
      return arr.reduce((flat, item) => {
        flat.push(item);
        if (item.children && item.children.length > 0) {
          flat = flat.concat(flattenArray(item.children));
        }
        delete item.children
        return flat;
      },
        []);
    }
    const { fileType, fileName } = params
    const items = flattenArray(itemsInfo);
    let { res, sizes } = this.getList(fileType, items)
    if (fileName) {
      res = res.filter((item) => item.name.includes(fileName))
    }
    return { data: { data: res, sizes } }
  }
  async fileDelete(data: { path: 'string', fileName: string }) {
    const { path: Path, fileName } = data
    const filePath = 'uploads' + Path
    fs.unlinkSync(filePath)
    return { data: '删除成功' }
  }
  async fileRename(data: { path: 'string', fileName: string, newFileName: string }) {
    const { path: Path, fileName, newFileName } = data
    const filePath = 'uploads' + Path
    const newPath = filePath.replace(fileName, newFileName)
    fs.renameSync(filePath, newPath)
    return { data: '重命名成功' }
  }
}
