import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDictDto {
  @ApiProperty({ description: 'ID' })
  id: number; // 标记为主列，值自动生成
  @ApiProperty({ description: '字典名称' })
  createTime: Date;
  @ApiProperty({ description: '字典名称', example: '字典名称' })
  name: string;
  @ApiProperty({ description: '字典标识', example: '' })
  code: string;
  @ApiProperty({ description: '字典状态', example: '' })
  status: boolean;
  @ApiProperty({ description: '字典备注', example: '' })
  description: string;
}
export class GetDictinfo {
  @ApiProperty({ description: 'id' })
  id: number;
}
export class DelDictDto {
  @ApiProperty({ description: 'IDS数组', default: [] })
  ids: number[];
}
export class SetDictInfoDto {
  @ApiProperty({ description: 'ID' })
  id: number; // 标记为主列，值自动生成
  @ApiProperty({ description: '字典信息名称', example: '' })
  name: string;
  @ApiProperty({ description: 'pid', example: '' })
  pid: number
  @ApiProperty({ description: '字典信息值', example: '' })
  value: number
  @ApiProperty({ description: '字典信息状态', example: '' })
  status: boolean
}