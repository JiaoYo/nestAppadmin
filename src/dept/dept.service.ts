import { CreateDeptDto } from './dto/create-dept.dto';
import { Dept } from './entities/dept.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private readonly dept: Repository<Dept>,
  ) { }
  // 获取部门列表
  async findAll(query: { name?: string, status?: string }) {
    const { name, status } = query
    const dept = this.dept.createQueryBuilder('dept');
    if (name) {
      dept.where('dept.name LIKE :name', { name: `%${name}%` });
    }
    if (String(status) === '0' || String(status) === '1') {
      if (name) {
        dept.andWhere('dept.status = :status', { status });
      } else {
        dept.where('dept.status = :status', { status });
      }
    }
    const depts = await dept.getMany();
    return { data: { list: depts }, message: '获取部门列表成功' }
  }
  // 获取部门详情
  async findOne(id: number) {
    const dept = await this.dept.createQueryBuilder('dept');
    dept.where('dept.id = :id', { id: id });
    const deptinfo = await dept.getOne();
    return { data: deptinfo, message: '获取部门详情成功' }
  }
  // 设置部门
  async setDept(createDeptDto: CreateDeptDto) {
    const dept = await this.dept.createQueryBuilder('dept');
    if (createDeptDto.id) {
      await dept.update().set(createDeptDto).where('id = :id', { id: createDeptDto.id }).execute();
      return { message: '更新部门成功' }
    }
    createDeptDto.createTime = new Date()
    delete createDeptDto.id
    await dept.insert().into(Dept).values(createDeptDto).execute();
    return { message: '添加部门成功' }
  }
  // 删除部门
  async remove(ids: number[]) {
    const qb = await this.dept.createQueryBuilder('user');
    qb.delete().from(Dept).where('id in (:...ids)', { ids: ids }).execute();
    return { message: '删除成功' };
  }
}
