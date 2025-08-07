import { Injectable } from '@nestjs/common';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { Dict } from './entities/dict.entity';
import { DictInfo } from './entities/dictinfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private readonly dict: Repository<Dict>,
    @InjectRepository(DictInfo)
    private readonly dictinfo: Repository<DictInfo>,
  ) { }
  // 设置字典
  async set(createDictDto: CreateDictDto) {
    const qb = await this.dict.createQueryBuilder('dict');
    if (createDictDto.id) {
      qb.update().set(createDictDto).where('id = :id', { id: createDictDto.id }).execute();
      return { message: '编辑成功' };
    }
    delete createDictDto.id
    createDictDto.createTime = new Date()
    qb.insert().into(Dict).values(createDictDto).execute();
    return { message: '添加成功' };
  }
  // 获取字典
  async findAll() {
    const qb = await this.dict.createQueryBuilder('dict');
    const qbinfo = await this.dictinfo.createQueryBuilder('dictinfo');
    const res = await qb.getMany();
    const total = await qb.getCount();
    const childrenQueriesPromises = res.map(async (item: any) => {
      item.infoList = await qbinfo.where('pid = :pid', { pid: item.id }).getMany();
    })
    await Promise.all(childrenQueriesPromises);
    return { data: { list: res, total: total } };
  }
  // 删除字典
  async del(ids: number[]) {
    const qb = await this.dict.createQueryBuilder('dict');
    qb.delete().from(Dict).where('id in (:...ids)', { ids: ids }).execute();
    return { message: '删除成功' };
  }
  // 获取字典详情列表
  async getDictInfo(body: any) {
    const qb = await this.dictinfo.createQueryBuilder('dictinfo');
    const { name, status } = body;
    qb.where('pid = :dictId', { dictId: body.id })
    if (name) {
      qb.andWhere('name LIKE :name', { name: `%${name}%` });
    }
    if (String(status) === '0' || String(status) === '1') {
      if (name) {
        qb.andWhere('status = :status', { status });
      } else {
        qb.andWhere('status = :status', { status });
      }
    }
    const res = await qb.getMany();
    const count = await qb.getCount();
    return { data: { list: res, total: count }, message: '获取详情成功' };
  }
  // 设置字典值
  async update(body: any) {
    const qb = await this.dictinfo.createQueryBuilder('dictinfo');
    if (body.id) {
      await qb.update().set(body).where('id = :id', { id: body.id }).execute();
      return { message: '编辑成功' };
    }
    delete body.id
    await qb.insert().into(DictInfo).values(body).execute();
    return { message: '添加成功' };
  }
  // 删除字典详情值
  async remove(ids: number[]) {
    const qb = await this.dictinfo.createQueryBuilder('dictinfo');
    qb.delete().from(DictInfo).where('id in(:...ids)', { ids: ids }).execute();
    return { message: '删除成功' };
  }
}
