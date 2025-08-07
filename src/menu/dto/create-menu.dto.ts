import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateMenuDto {
  @ApiProperty({ description: 'id' })
  id: number; // 标记为主列，值自动生成
  @ApiProperty({ description: 'pid' })
  pid: number;
  path: string;
  component: string;
  redirect: string;
  type: string;
  @IsNotEmpty({ message: '名称不能为空' })//验证是否为空
  @ApiProperty({ description: '名称' })
  title: string;
  @ApiProperty({ description: '图标' })
  svgIcon: string;
  @ApiProperty({ description: '图标' })
  icon: string;
  @ApiProperty({ description: '是否缓存' })
  keepAlive: boolean;
  @ApiProperty({ description: '是否隐藏' })
  hidden: number;
  @ApiProperty({ description: '排序' })
  sort: string;
  activeMenu: string;
  breadcrumb: number;
  status: string;
  roles: string;
  permission: string;
  showInTabs: number;
  alwaysShow: number;
  affix: number;
}
export class DelMenuDto{
  @ApiProperty({ description: 'id' })
  id: number;
}
