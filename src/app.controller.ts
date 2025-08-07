import { Controller, Get, Post, Body, Req  } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
class loginDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  username: string;
  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
}
class regUserDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  username: string;
  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
}
class setPsdDto {
  @ApiProperty({ description: 'ID' })
  id: number
  @ApiProperty({ description: '密码', example: '123456' })
  oldPassword: string;
  @ApiProperty({ description: '新密码', example: '123456' })
  newPassword: string;
}
class setAvatarDto {
  @ApiProperty({ description: 'ID' })
  id: number
  @ApiProperty({ description: '头像' })
  avatar: string;
}
@ApiTags('登录登出')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Post('login')
  @ApiOperation({ summary: '登录' })
  login(@Body() data: loginDto) {
    return this.appService.login(data);
  }
  @Post('regUser')
  @ApiOperation({ summary: '注册', description: '创建一个用户' })
  register(@Body() data: regUserDto) {
    return this.appService.regUser(data);
  }
  @Get('logout')
  @ApiOperation({ summary: '登出' })
  logout() {
    return { message: '退出成功' }
  }
  @Post('updatePassword')
  @ApiOperation({ summary: '设置密码' })
  setPassword(@Body() data: setPsdDto) {
    return this.appService.setPassword(data);
  }
  @Post('setAvatar')
  @ApiOperation({ summary: '设置头像' })
  setAvatar(@Body() data: setAvatarDto) {
    return this.appService.setAvatar(data);
  }
  @Get('getWatcher')
  @ApiOperation({ summary: '获取天气' })
  async getWatcher(@Req() req: Request) {
    return this.appService.getWatcher(req);
  }
  @Get('status')
  async getStatus() {
    return await this.appService.getServerStatus();
  }
}
