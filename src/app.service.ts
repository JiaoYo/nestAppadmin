import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import checkDiskSpace from 'check-disk-space';
import * as os from 'os';
import axios from 'axios';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { Cron } from '@nestjs/schedule';
const config = require('./config') // 配置文件
import { RedisService } from './common/redis'
import { User } from './user/entities/user.entity'
import { MailService } from './mail/mail.service';
import { SocketScheduleGateway } from './schedule/socket_Schedule.gatewary';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly redisService: RedisService,
    private readonly MailService: MailService,
    private readonly socketGateway: SocketScheduleGateway
  ) { this.handleCron() }
  // 登录
  async login(data: any) {
    const { username, password } = data;
    const qb = this.user.createQueryBuilder('user');
    qb.where('username = :username', { username })
    const results = await qb.getMany();
    if (results.length == 0) {
      throw new HttpException('用户不存在', 401);
    }
    const testPassword = results[0].password
    const isPasswordValid = await bcrypt.compare(password, testPassword);
    if (!isPasswordValid) {
      throw new HttpException('密码错误', 401);
    }
    if (!results[0].status) {
      throw new HttpException('用户被禁用', 401);
    }
    const obj = {
      roleIds: results[0].roleIds,
      username,
      password,
      id: results[0].id,
    }
    const token = jwt.sign({ obj }, config.jwtSecretKey, { expiresIn: config.expiresIn });
    this.redisService.setValue(username, token)
    return { data: { token: 'Bearer ' + token }, message: '登录成功' }
  }
  // 注册
  async regUser(data: any) {
    const { username, password } = data;
    const qb = await this.user.createQueryBuilder('user');
    qb.where('username = :username', { username })
    const results = await qb.getMany();
    if (results.length > 0) {
      throw new HttpException('用户名已存在', 401);
    }
    const userinfo = <any>{}
    userinfo.username = username
    userinfo.password = await bcrypt.hashSync(password, 10);
    userinfo.roleIds = JSON.stringify(['role_user'])
    userinfo.status = 1
    userinfo.nickname = userinfo.username
    userinfo.createTime = new Date()
    qb.insert().into(User).values(userinfo).execute();
    return { message: '注册成功' }
  }
  // 设置密码
  async setPassword(data: any) {
    const { oldPassword, newPassword, id } = data;
    const qb = await this.user.createQueryBuilder('user');
    qb.where('id = :id', { id })
    const results = await qb.getOne();
    const isPasswordValid = await bcrypt.compare(oldPassword, results.password);
    if (!isPasswordValid) {
      throw new HttpException('原密码错误', 401);
    }
    results.password = await bcrypt.hashSync(newPassword, 10);
    qb.update().set({ password: results.password }).where('id = :id', { id }).execute();
    return { message: '密码修改成功' }
  }
  // 设置头像
  async setAvatar(data: any) {
    const { avatar, id } = data;
    const qb = await this.user.createQueryBuilder('user');
    qb.update().set(data).where('id = :id', { id }).execute();
    return { message: '修改成功' }
  }

  async getWatcher(req: Request) {
    let data = {};
    function normalizeIp(ip: string): string {
      return ip.startsWith('::ffff:') ? ip.substring(7) : ip;
    }
    const rawIp = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
    const clientIp = normalizeIp(typeof rawIp === 'string' ? rawIp : '');
    await axios.get(`http://gfeljm.tianqiapi.com/api?unescape=1&version=v61&appid=42566526&appsecret=KzCbZ4UB&ip=${clientIp.length > 7 ? clientIp : '115.204.0.183'}`)
      .then(res => {
        data = res.data;
      });

    return {
      data,
    };
  }


  // 定时任务 获取系统状态
  private cpuThreshold = 80;
  private memThreshold = 80;
  private diskThreshold = 80;

  @Cron('*/60 * * * * *') // 每 60 秒执行一次
  async handleCron() {
    console.log('定时任务执行中...');
    const status = await this.getServerStatus();
    if (this.shouldAlarm(status.data)) {
      await this.sendAlarm(status.data);
    }
  }

  async getServerStatus() {
    const cpus = os.cpus();
    const idle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
    const total = cpus.reduce((acc, cpu) => {
      const t = cpu.times;
      return acc + t.user + t.nice + t.sys + t.irq + t.idle;
    }, 0);
    const cpuUsage = 100 - (idle / total) * 100;

    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const memUsage = ((totalMem - freeMem) / totalMem) * 100;
    let diskPath = '/'; // 默认 Linux
    const platform = os.platform(); // 'win32', 'linux', 'darwin'

    if (platform === 'win32') {
      diskPath = 'C:\\'; // Windows 要指定盘符
    }

    const diskInfo = await checkDiskSpace(diskPath);
    const diskUsed = ((diskInfo.size - diskInfo.free) / diskInfo.size) * 100;
    return {
      data: {
        cpuUsage: cpuUsage.toFixed(2),
        memUsage: memUsage.toFixed(2),
        diskUsage: diskUsed.toFixed(2),
      },
      message: '获取服务器状态成功'
    }
  }

  private shouldAlarm({ cpuUsage, memUsage, diskUsage }) {
    console.log(`CPU: ${cpuUsage}%, 内存: ${memUsage}%, 磁盘: ${diskUsage}%`);

    return (
      cpuUsage > this.cpuThreshold ||
      memUsage > this.memThreshold ||
      diskUsage > this.diskThreshold
    );
  }

  private async sendAlarm(status: any) {
    let text = `系统资源告警：`
    if (status.cpuUsage > this.cpuThreshold) {
      text += `CPU使用率过高: ${status.cpuUsage}%`;
    }
    if (status.memUsage > this.memThreshold) {
      text += ` 内存使用率过高: ${status.memUsage}%`;
    }
    if (status.diskUsage > this.diskThreshold) {
      text += ` 磁盘使用率过高: ${status.diskUsage}%`;
    }
    this.socketGateway.sendAlarmMessage(text);
    // try {
    //   await this.MailService.sendAlertMail(
    //     status.cpuUsage,
    //     status.memUsage,
    //     status.diskUsage
    //   );
    // } catch (error) {
    // }
  }
}
