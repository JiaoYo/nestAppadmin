import { Injectable } from '@nestjs/common';
import { setRoleMenu } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity'
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
  ) { }
  // 获取角色列表
  async findAll(body: any) {
    const { page, size, name, status } = body
    const role = await this.role.createQueryBuilder('role');
    if (name) {
      role.andWhere('name like :name', { name: `%${name}%` });
    }
    if (String(status) == '0' || String(status) == '1') {
      role.andWhere('status = :status', { status });
    }
    role.limit(size);
    role.offset(size * (page - 1));
    const roles = await role.getMany();
    const total = await role.getCount()
    return { data: { list: roles, total }, message: '获取角色列表成功' }
  }
  // 获取角色所拥有的菜单
  async findOne(id: number) {
    const role = await this.role.createQueryBuilder('role');
    role.select('role.menus')
    role.where('id = :id', { id });
    const roleMenuInfo = await role.getOne();
    return { data: roleMenuInfo, message: '获取角色权限成功' };
  }
  // 设置角色的权限
  async setRoleMenu(body: setRoleMenu) {
    const role = await this.role.createQueryBuilder('role');
    role.update(Role).set({ menus: body.menus }).where('id = :id', { id: body.id }).execute();
    return { message: '设置角色权限成功' };
  }
  // 获取角色的详情
  async getRoleInfo(id: number) {
    const role = await this.role.createQueryBuilder('role');
    role.where('id = :id', { id });
    const roleInfo = await role.getOne();
    return { data: roleInfo, message: '获取角色详情成功' };
  }
  // 设置角色
  async setRoleInfo(body: Partial<Role>) {
    const role = await this.role.createQueryBuilder('role');
    if (body.id) {
      await role.update(Role).set(body).where('id = :id', { id: body.id }).execute();
      return { message: '更新角色成功' };
    }
    body.createTime = new Date()
    delete body.id
    await role.insert().values(body).execute();
    return { message: '创建角色成功' };

  }
  // 删除角色
  async remove(ids: number[]) {
    const qb = await this.role.createQueryBuilder('role');
    qb.delete().from(Role).where('id in (:...ids)', { ids: ids }).execute();
    return { message: '删除成功' };
  }
}
