import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity'
const jwt = require('jsonwebtoken');
const config = require('../config') // 配置文件
@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly schedule: Repository<Schedule>,
  ) { }
  create(createScheduleDto: CreateScheduleDto) {
    const db = this.schedule.createQueryBuilder()
    if (createScheduleDto.id) {
      db.where('id = :id', { id: createScheduleDto.id })
      db.update(Schedule).set(createScheduleDto).execute()
      return { data: createScheduleDto, message: '修改成功' };
    }
    db.insert().into(Schedule).values(createScheduleDto).execute()
    return { data: createScheduleDto, message: '添加成功' };
  }
  async findAll(token: string) {
    const obj = jwt.verify(token, config.jwtSecretKey);
    const db = this.schedule.createQueryBuilder()
    const likeValue = `%${obj.obj.id}%`;
    db.where('createId = :id', { id: obj.obj.id })
    db.orWhere('participants LIKE :likeValue', { likeValue })
    const data = await db.getMany()
    return { data: data, message: '查询成功' };
  }
  remove(id: number) {
    const db = this.schedule.createQueryBuilder()
    db.delete().from(Schedule).where('id = :id', { id: id }).execute()
    return { message: '删除成功' };
  }
}
