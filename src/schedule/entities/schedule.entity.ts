import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('ev_schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP " })
  start: Date;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP " })
  end: Date;
  @Column({ type: "varchar", length: 255 })
  title: string;
  @Column({ type: "varchar", length: 255 })
  color: string;
  @Column({ type: "varchar", length: 255, default: '' })
  desc: string;
  @Column({ type: 'int' })
  createId: number;
  @Column({ type: "varchar", length: 255 })
  remind: string;
  @Column({ type: "varchar", length: 255, default: '[]' })
  participants: number[];
}