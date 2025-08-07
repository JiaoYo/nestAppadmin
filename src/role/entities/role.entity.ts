import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('ev_roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP " })
  createTime: Date;
  @Column({ type: "varchar", length: 255 })
  name: string;
  @Column({ type: "varchar", length: 255 })
  code: string;
  @Column({ type: 'tinyint' })
  status: boolean;
  @Column({ type: "varchar", length: 255 })
  description: string;
  @Column({ type: "varchar", length: 255, default: '[]' })
  menus: number[];
}