import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto, DelDeptDto } from './dto/create-dept.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('部门')
@ApiBearerAuth()
@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) { }
  @Get()
  @ApiOperation({ summary: '获取部门列表', description: '获取全部部门列表' })
  findAll(@Query() query: { name?: string, status?: string }) {
    return this.deptService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取某个部门详情', description: '获取某个部门详情' })
  findOne(@Param('id') id: string) {
    return this.deptService.findOne(+id);
  }

  @Post('set')
  @ApiOperation({ summary: '设置部门', description: '设置部门（有id修改部门，无id添加部门）' })
  set(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.setDept(createDeptDto);
  }

  @Post('del')
  @ApiOperation({ summary: '删除部门', description: '删除部门' })
  remove(@Body() body: DelDeptDto) {
    return this.deptService.remove(body.ids);
  }
}
