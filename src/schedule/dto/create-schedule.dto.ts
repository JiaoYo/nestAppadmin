import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateScheduleDto {
  @ApiProperty({ description: 'ID' })
  id: number
  @ApiProperty({ description: '创建人ID' })
  createId: number;
  @ApiProperty({ description: '开始时间' })
  start: Date;
  @ApiProperty({ description: '结束时间' })
  end: Date;
  @ApiProperty({ description: '日程标题' })
  title: string;
  @ApiProperty({ description: '备注' })
  desc: string;
  @ApiProperty({ description: '颜色' })
  color: string;
  @ApiProperty({ description: '通知' })
  remind: string;
  @ApiProperty({ description: '参会人员', example: [] })
  participants: number[];
}
