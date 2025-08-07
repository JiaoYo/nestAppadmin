// src/websocket/ws-server.ts
import { Server as HttpServer } from 'http';
import * as WebSocket from 'ws';
import { INestApplicationContext } from '@nestjs/common';
import { YourService } from './ws.service'; // 替换为你的实际服务

export class WebSocketServer {
  private wss: WebSocket.Server;
  private app: INestApplicationContext;

  constructor(httpServer: HttpServer) {
    this.wss = new WebSocket.Server({ server: httpServer, path: '/ws' }); // WebSocket路径
  }

  async bind(app: INestApplicationContext) {
    this.app = app;

    const yourService = this.app.get(YourService); // 获取 Nest 中的服务

    this.wss.on('connection', (socket: WebSocket) => {
      console.log('🔌 WebSocket 客户端已连接');
      yourService.addClient(socket);
      socket.on('message', async (message: string) => {
        const data = JSON.parse(message);
        console.log('📩 收到消息:', data);
        // 获取历史数据
        if (data.type === 'getData') {
          await yourService.gethistoryData(socket);
        }
        // 接收信息 发送消息
        if (data.type === 'sendMessage') {
          await yourService.sendMessage(socket, data);
        }
      });
      socket.on('close', () => {
        console.log('❌ WebSocket 客户端断开');
      });
    });
  }
}
