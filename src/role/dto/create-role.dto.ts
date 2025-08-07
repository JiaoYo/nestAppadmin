import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'ID' })
  id: number
  @ApiProperty({ description: '创建时间' })
  createTime: Date;
  @ApiProperty({ description: '角色名称' })
  name: string;
  @ApiProperty({ description: '角色编码', example: '1' })
  code: string;
  @ApiProperty({ description: '角色状态', example: '1' })
  status: boolean;
  @ApiProperty({ description: '角色备注', example: '1' })
  description: string;
  @ApiProperty({ description: '权限id数组', example: [] })
  menus: number[];
}

export class GetRoleListDto {
  @ApiProperty({ description: '页数', example: 1 })
  page: number
  @ApiPropertyOptional({ description: '每页条数', example: 10 })
  size: number
  @ApiProperty({ description: '角色名称', example: '' })
  name: string
  @ApiProperty({ description: '角色状态', example: '' })
  status: boolean
}
export class setRoleMenu {
  @ApiProperty({ description: '权限id数组', example: [] })
  menus: number[]
  @ApiProperty({ description: 'ID' })
  id: number
}
export class DelRoleDto {
  @ApiProperty({ description: 'IDS数组', default: [] })
  ids: number[]
}