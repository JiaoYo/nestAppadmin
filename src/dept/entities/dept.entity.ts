import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('ev_dept')
export class Dept {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成
  @Column({ type: "int", default: null })
  pid: string;
  @Column({ type: "varchar", length: 255 })
  name: string;
  @Column({ type: "int", default: 0 })
  sort: number;
  @Column({ type: "int", default: 1 })
  status: string;
  @Column({ type: 'datetime', default: null })
  createTime: Date;
  @Column({ type: "varchar", length: 200 })
  description: boolean;

}
