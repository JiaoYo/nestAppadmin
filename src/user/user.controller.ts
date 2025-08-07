import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { SetUserDto, GetUserListDto, DeleteUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../common/role.decorator'
@ApiTags('用户')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('set')
  @ApiOperation({ summary: '设置用户', description: '设置一个用户(有id是修改，无id修改)' })
  create(@Role(["role_admin"]) @Body() createUserDto: SetUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('list')
  @ApiOperation({ summary: '获取所有用户', description: '获取所有用户' })
  findAll(@Body() body: GetUserListDto) {
    return this.userService.findAll(body);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户详情', description: '获取用户详情' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }
  @Post('userInfo')
  @ApiOperation({ summary: '获取用户信息', description: '获取用户信息' })
  getInfo(@Headers() header: any) {
    return this.userService.getInfo(header.authorization.replace('Bearer', '').trim());
  }
  @Post('del')
  @ApiOperation({ summary: '删除用户', description: '删除用户' })
  remove(@Role(["role_admin"]) @Body() body: DeleteUserDto) {
    return this.userService.remove(body.ids);
  }
}
