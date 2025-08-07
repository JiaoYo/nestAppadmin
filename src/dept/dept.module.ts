import { Module } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { Dept } from './entities/dept.entity'
import { TypeOrmModule } from '@nestjs/typeorm'; // 关联数据
@Module({
  imports: [TypeOrmModule.forFeature([Dept])],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule { }
