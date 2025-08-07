import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 关联数据
import { User } from './entities/user.entity'; // 数据
import { Menu } from '../menu/entities/menu.entity'
import { Role } from '../role/entities/role.entity';
import { Dept } from '../dept/entities/dept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Menu, Role,Dept])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
