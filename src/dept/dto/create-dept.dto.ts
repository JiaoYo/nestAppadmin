import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateDeptDto {
  @ApiProperty({ description: 'ID' })
  id: number; // 标记为主列，值自动生成
  @ApiProperty({ description: '所属部门' })
  pid: string;
  @ApiProperty({ description: '部门名称' })
  name: string;
  @ApiProperty({ description: '排序' })
  sort: number;
  @ApiProperty({ description: '状态' })
  status: string;
  @ApiProperty({ description: '创建时间' })
  createTime: Date;
  @ApiProperty({ description: '备注' })
  description: boolean;
}
export class DelDeptDto {
  @ApiProperty({ description: 'IDS数组' })
  ids: number[];
}
