import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway'
import { Socket } from './entities/socket.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Socket])],
  providers: [SocketGateway, SocketService],
})
export class SocketModule { }
