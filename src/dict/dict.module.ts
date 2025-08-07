import { Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { Dict } from './entities/dict.entity'
import { DictInfo } from './entities/dictinfo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Dict, DictInfo])],
  controllers: [DictController],
  providers: [DictService],
})
export class DictModule { }
