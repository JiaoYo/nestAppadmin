import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('ev_upload')
export class Upload {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP " })
  createTime: Date;
  @Column({ type: "varchar", length: 255 })
  name: string;
  @Column({ type: "varchar", length: 255 })
  src: string;
  @Column({ type: "varchar", length: 255 })
  extendName: string;
  @Column({ type: 'tinyint' })
  isDir: boolean;
  @Column({ type: "varchar", length: 255 })
  filePath: string;
  @Column({ type: 'int' })
  size: boolean;
}