import { Injectable } from '@nestjs/common';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socket } from './entities/socket.entity'
@Injectable()
export class SocketService {
  constructor(
    @InjectRepository(Socket)
    private readonly socket: Repository<Socket>,
  ) { }
  // 给每个人分配一个房间
  join(id: string, socket: any) {
    socket.join(id);
  }
  // 创建消息
  async create(body: any, client: any, socket: any) {
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
    const obj = formatMessage(body[0], body[1], body[2], body[3]);
    const result = await this.socket
      .createQueryBuilder()
      .insert()
      .into(Socket)
      .values(obj)
      .execute();
    const newSocketId = result.identifiers[0].id;
    obj['id'] = newSocketId;
    // 发送消息
    if (body[3] == "user") {
      socket.emit('message1', newSocketId);
      // socket.broadcast.to(body[0].id).emit('message', obj);
      socket.broadcast.to(body[1].id).emit('message', obj);
    } else {
      client.to('room').emit('message', obj);
    }

  }
  // 获取历史消息
  async gethistoryData(id: string, client: any) {
    const socket = this.socket.createQueryBuilder('socket');
    socket.where('toId = :id ', { id:1 });
    const roomMessages = await socket.getMany();
    socket.where('formId = :id OR toId = :id ', { id });
    let result = await socket.getMany();
    // 过滤出用户和聊天室的消息
    const userMessages = result.filter(item => item.toName !== "聊天室");
    client.emit('historyData', userMessages, roomMessages);
  }
  // 撤回消息
  async withdrawMessage( id: number ,sockets:any) {
    const socket = this.socket.createQueryBuilder('socket');
    await socket.update().set({ status: 1}).where('id = :id', { id }).execute();
    sockets.emit('withdrawMessageAll');
  }
}
