import { Injectable, HttpException } from '@nestjs/common';
import { SetUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'
import { Menu } from '../menu/entities/menu.entity'
import { Role } from '../role/entities/role.entity';
import { Dept } from '../dept/entities/dept.entity';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config') // 配置文件
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Menu) private readonly menu: Repository<Menu>,
    @InjectRepository(Role) private readonly role: Repository<Role>,
    @InjectRepository(Dept) private readonly dept: Repository<Dept>,
  ) { }
  // 创建用户
  async create(data: Partial<User>) {
    const qb = await this.user.createQueryBuilder('user');
    if (data.id) {
      await qb.update().set(data).where('id = :id', { id: data.id }).execute();
      return { message: '修改成功' }
    }
    qb.where('username = :username', { username: data.username })
    const results = await qb.getMany();
    if (results.length > 0) {
      throw new HttpException('用户名已存在', 401);
    }
    data.password = await bcrypt.hashSync(data.password, 10);
    data.createTime = new Date()
    delete data.id
    qb.insert().into(User).values(data).execute();
    return { message: '添加成功' }
  }
  // 获取用户列表
  async findAll(body: any): Promise<any> {
    const qb = this.user.createQueryBuilder('user');
    const dept = this.dept.createQueryBuilder('dept');
    const { page = 1, size = 10, deptId, username, status } = body;
    if (deptId) {
      const getDeptIds = async (currentDeptId: number): Promise<number[]> => {
        const childDepts = await dept.where('dept.pid = :deptId', { deptId: currentDeptId }).getMany();
        const childDeptIds = childDepts.map(dept => dept.id);
        const nestedDeptIds = await Promise.all(
          childDeptIds.map(id => getDeptIds(id))
        );
        return [...childDeptIds, ...nestedDeptIds.flat()];
      };
      const deptIds = await getDeptIds(deptId);
      deptIds.push(deptId)
      qb.where('user.deptId IN (:...deptIds)', { deptIds });
    }
    if (username) {
      qb.andWhere('username like :username', { username: `%${username}%` });
    }
    if (String(status) == '0' || String(status) == '1') {
      qb.andWhere('status = :status', { status });
    }
    qb.limit(size);
    qb.offset(size * (page - 1));
    const count = await qb.getCount();
    const posts = await qb.getMany();
    return { data: { list: posts, total: count }, message: '获取用户列表成功' };
  }
  // 获取用户详情
  async findOne(id: number) {
    const qb = await this.user.createQueryBuilder('user');
    qb.where('id = :id', { id: id });
    const user = await qb.getMany();
    return { data: user[0], message: '获取用户详情成功' };
  }
  // 获取用户信息（token）
  async getInfo(token: string) {
    const obj = jwt.verify(token, config.jwtSecretKey);
    const qb = await this.user.createQueryBuilder('user');
    qb.where('id = :id', { id: obj.obj.id });
    const user: any = await qb.getMany();
    let codes = JSON.parse(user[0]?.roleIds) ? JSON.parse(user[0]?.roleIds) : ['role_user']
    const role = await this.role.createQueryBuilder('role')
    role.select('role.menus')
    role.where('code in  (:...codes)', { codes })
    const roles = await role.getMany();
    let mergedMenus = []
    roles.forEach((item: any) => {
      if (item.menus) {
        mergedMenus.push(...JSON.parse(item.menus))
      }
    })
    mergedMenus = [...new Set(mergedMenus)]
    const menu = await this.menu.createQueryBuilder('menu')
    menu.where('status = :status', { status: 1 })
    const menus = await menu.getMany()
    menus.forEach((item: any) => {
      item.keepAlive = item.keepAlive == 1
      item.hidden = item.hidden == 1
      item.breadcrumb = item.breadcrumb == 1
      item.showInTabs = item.showInTabs == 1
      item.affix = item.affix == 1
      item.alwaysShow = item.alwaysShow == 1
    })
    let arr = menus.filter(item => {
      return mergedMenus.includes(item.id)
    })
    user[0].menus = arr
    return { data: user[0], message: '获取用户信息成功' };
  }
  // 删除用户
  async remove(ids: number[]) {
    const qb = await this.user.createQueryBuilder('user');
    qb.delete().from(User).where('id in (:...ids)', { ids: ids }).execute();
    return { message: '删除成功' };
  }
}
