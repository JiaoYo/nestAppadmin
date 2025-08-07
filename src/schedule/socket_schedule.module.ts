import { Module } from '@nestjs/common';
import { Schedule } from './entities/schedule.entity'
import { SocketScheduleGateway } from './socket_Schedule.gatewary'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [SocketScheduleGateway],
  exports: [SocketScheduleGateway], // 如果其他模块也要用
})
export class socketScheduleModule {}
