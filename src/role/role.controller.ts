import { Controller, Get, Post, Body, Param,HttpException } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, GetRoleListDto, setRoleMenu, DelRoleDto } from './dto/create-role.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../common/role.decorator'

@ApiTags('角色')
@Controller('role')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) { }
  @Post('list')
  @ApiOperation({ summary: '获取角色列表' })
  findAll(@Body() body: GetRoleListDto) {
    return this.roleService.findAll(body);
  }

  @Get('menu/:id')
  @ApiOperation({ summary: '获取角色的权限' })
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(+id);
  }

  @Post('menu')
  @ApiOperation({ summary: '设置角色的权限' })
  setRoleMenu(@Role(["role_admin"]) @Body() body: setRoleMenu) {
    return this.roleService.setRoleMenu(body);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取角色的详情' })
  getRoleInfo(@Param('id') id: number) {
    return this.roleService.getRoleInfo(+id);
  }

  @Post('set')
  @ApiOperation({ summary: '设置角色' })
  setRoleInfo(@Role(["role_admin"]) @Body() body: CreateRoleDto) {
    return this.roleService.setRoleInfo(body);
  }

  @Post('del')
  @ApiOperation({ summary: '删除角色' })
  remove(@Role(["role_admin"]) @Body() body: DelRoleDto) {
    if (body.ids.includes(1)) {
      // 禁止删除超级管理员
      throw new HttpException('管理员角色不能删除', 401);
    }
    return this.roleService.remove(body.ids);
  }
}
