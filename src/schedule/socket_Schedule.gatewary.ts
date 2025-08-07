import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Server, Socket } from 'socket.io';
const schedule = require('node-schedule');
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'schedule' })
export class SocketScheduleGateway {
  private scheduledJobs: { [key: string]: any } = {}; // Object to store scheduled jobs

  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {
    this.startScheduledJob();
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  join(@MessageBody() id: string, @ConnectedSocket() client: Socket) {
    client.join(id);
  }

  // 开始定时任务
  private startScheduledJob() {
    const intervalTime = 60000; // 一分钟
    setInterval(() => {
      this.handleInterval();
    }, intervalTime);
  }
  // 处理定时任务的逻辑
  private async handleInterval() {
    this.cancelScheduledJobs();
    const filterTime = (time: Date, remind: number): string => {
      const result = new Date(time);
      result.setMinutes(result.getMinutes() - remind);
      const padNumber = (num: number): string => String(num).padStart(2, '0');
      const year = result.getFullYear();
      const month = padNumber(result.getMonth() + 1);
      const day = padNumber(result.getDate());
      const hours = padNumber(result.getHours());
      const minutes = padNumber(result.getMinutes());
      const seconds = padNumber(result.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const queryBuilder = this.scheduleRepository.createQueryBuilder('schedule');
    const result = await queryBuilder.where('schedule.remind != 1').andWhere('start > :now', { now: new Date() }).getMany();
    result.forEach((item) => {
      const peopleArr = JSON.parse(JSON.parse(JSON.stringify(item.participants)));
      if (item.remind == '1') return
      const time = filterTime(item.start, +item.remind);
      const job = schedule.scheduleJob(time, () => {
        peopleArr.forEach((element: any) => {
          this.server.to(String(element)).emit('message', { title: item.title, start: item.start });
        });
      });
      this.scheduledJobs[item.id] = job;
    });
  }
  private cancelScheduledJobs() {
    Object.keys(this.scheduledJobs).forEach(jobId => {
      const job = this.scheduledJobs[jobId];
      if (job) {
        job.cancel();
      }
    });
    this.scheduledJobs = {};
  }
  sendAlarmMessage(text: string) {
    console.log('发送告警消息:', text);
    this.server.emit('alarm', {
      title: '系统告警', text
    });
  }
}
