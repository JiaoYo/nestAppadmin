import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'webchat' })
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {
  }
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('historyData')
  gethistoryData(@MessageBody() id: string, @ConnectedSocket() client: Socket) {
    this.socketService.gethistoryData(id, client);
  }
  @SubscribeMessage('join')
  join(@MessageBody() id: string, @ConnectedSocket() client: Socket) {
    client.join('room')
    this.socketService.join(id, client);
  }
  @SubscribeMessage('chatMessage')
  create(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    return this.socketService.create(body, this.server, client);
  }

  @SubscribeMessage('withdraw')
  withdrawMessage(@MessageBody() id: number) {
    return this.socketService.withdrawMessage(id, this.server);
  }
}
