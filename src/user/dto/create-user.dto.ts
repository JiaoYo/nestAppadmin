import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class SetUserDto {
  @ApiProperty({ description: 'ID' })
  id: number;
  @IsString() //是否为字符串
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({ description: '用户名' })
  username: string;
  @IsNotEmpty({ message: '昵称不能为空' })
  @ApiProperty({ description: '昵称' })
  nickname: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty({ description: '密码' })
  password: string;
  @ApiProperty({ description: '邮箱' })
  email: string;
  @ApiProperty({ description: '头像' })
  avatar: string;
  @ApiProperty({ description: '性别' })
  gender: boolean;
  @ApiProperty({ description: '是否禁用' })
  disabled: boolean;
  @ApiProperty({ description: '创建时间' })
  createTime: Date;
  @ApiProperty({ description: '状态' })
  status: boolean;
  @ApiProperty({ description: '手机号' })
  phone: number;
  @ApiProperty({ description: '角色ID', default: ["role_user"] })
  roleIds: Array<string>;
  @ApiProperty({ description: '角色名称' })
  roleNames: string;
  @ApiProperty({ description: '部门id' })
  deptId: number;
  @ApiProperty({ description: '部门名称' })
  deptName: string;
}
export class GetUserListDto {
  @ApiProperty({ description: '页码', default: 1 })
  page: number
  @ApiProperty({ description: '每页条数', default: 10 })
  size: number
  @ApiProperty({ description: '部门id' })
  deptId: number
  @ApiProperty({ description: '用户名', default: '' })
  username: string
}
export class DeleteUserDto {
  @ApiProperty({ description: 'ids数组', default: [] })
  ids: number[]
}