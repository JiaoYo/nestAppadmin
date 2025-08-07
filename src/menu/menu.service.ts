import { Injectable, HttpException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menu: Repository<Menu>,
  ) { }
  // 查询菜单
  async findAll(query: { name?: string, status?: string }) {
    const { name, status } = query
    const menu = await this.menu.createQueryBuilder('menu')
    menu.where('1 = 1');
    if (name) {
      menu.andWhere('menu.title LIKE :title', { title: `%${name}%` });
    }
    if (status === '0' || status === '1') {
      menu.andWhere('menu.status = :status', { status });
    }
    const menus = await menu.getMany()
    return { data: { list: menus }, message: '获取菜单数据成功' }
  }
  // 查询菜单详情
  async findOne(id: number) {
    const menu = await this.menu.createQueryBuilder('menu')
    menu.where('id = :id', { id })
    const menuDetail: any = await menu.getOne()
    menuDetail.keepAlive = menuDetail.keepAlive == 1 ? true : false;
    menuDetail.hidden = menuDetail.hidden == 1 ? true : false;
    menuDetail.breadcrumb = menuDetail.breadcrumb == 1 ? true : false;
    menuDetail.showInTabs = menuDetail.showInTabs == 1 ? true : false;
    menuDetail.affix = menuDetail.affix == 1 ? true : false;
    menuDetail.alwaysShow = menuDetail.alwaysShow == 1 ? true : false;
    return { data: menuDetail, message: '获取菜单详情成功' }
  }
  // 设置菜单
  async setdate(createMenuDto: CreateMenuDto) {
    const menu = await this.menu.createQueryBuilder('menu')
    if (createMenuDto.id) {
      await menu.update(Menu).set(createMenuDto).where('id = :id', { id: createMenuDto.id }).execute()
      return { message: '更新菜单成功' }
    }
    await menu.insert().into(Menu).values(createMenuDto).execute()
    return { message: '添加菜单成功' }
  }
  // 删除菜单
  async remove(id: number) {
    const menu = await this.menu.createQueryBuilder('menu')
    menu.delete().from(Menu).where('id = :id OR pid = :id', { id }).execute()
    return { message: '删除菜单成功' }
  }
}
