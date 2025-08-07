// src/your-service/your.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socket } from '../socket/entities/socket.entity'
const clients = new Set<any>();
@Injectable()
export class YourService {
  constructor(
    @InjectRepository(Socket)
    private readonly socket: Repository<Socket>,
  ) { }
  /** 添加客户端 */
  addClient(socket: any) {
    clients.add(socket);
    socket.on('close', () => {
      clients.delete(socket);
      console.log('❌ 客户端断开连接');
    });
  }
  // 获取历史数据
  async gethistoryData(socket: any) {
    const mysocket = this.socket.createQueryBuilder('socket');
    mysocket.where('toId = :id ', { id: 1 });
    const roomMessages = await mysocket.getMany();
    socket.send(JSON.stringify({ type: 'historyData', data: roomMessages }));
  }
  // 发送消息
  async sendMessage(socket: any, data: any) {
    const formatMessage = (form: any, to: any, message: string, type: string) => {
      return {
        formName: form.nickname,
        formId: form.id,
        formUrl: form.avatar,
        toUrl: to.avatar,
        toId: to.id,
        message,
        createTime: new Date(),
        toName: to.nickname,
        type
      };
    }
    const obj = formatMessage(data.form, data.to, data.message, 'room');
    console.log('📤 回复客户端:', obj);
    try {
      const result = await this.socket
        .createQueryBuilder()
        .insert()
        .into(Socket)
        .values(obj)
        .execute();

      console.log('✅ 数据插入成功:', result);

      obj['id'] = result.identifiers[0]?.id || null;

      if (!obj['id']) {
        console.warn('⚠️ 数据插入后未获取到 ID');
      }
      // ✅ 广播给所有客户端
      clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ type: 'onmessage', data: obj }));
        }
      });
      // 回复客户端
      // socket.send(JSON.stringify({ type: 'onmessage', data: obj }));
    } catch (error) {
      console.error('❌ 数据库插入失败:', error);
      socket.send(JSON.stringify({ type: 'error', message: '数据库写入失败' }));
    }
  }
}
