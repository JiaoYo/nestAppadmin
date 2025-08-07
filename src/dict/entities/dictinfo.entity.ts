import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('ev_dict_info')
export class DictInfo {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成
  @Column({ type: "int" })
  pid: number;
  @Column({ type: "varchar", length: 255 })
  name: string;
  @Column({ type: "varchar" })
  value: number;
  @Column({ type: "int" })
  status: number;
}