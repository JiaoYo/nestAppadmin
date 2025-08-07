import { Controller, Get, Post, Body, Query, Param, Delete, Headers } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('日程')
@Controller('schedule')
@ApiBearerAuth()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Post('set')
  @ApiOperation({ summary: '设置日程' })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: '查询用户的日程列表' })
  findAll(@Headers() header: any) {
    return this.scheduleService.findAll(header.authorization?.replace('Bearer', '').trim());
  }
  @Post('del/:id')
  @ApiOperation({ summary: '删除日程' })
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
