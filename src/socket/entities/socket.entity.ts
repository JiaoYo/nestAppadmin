import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('ev_message')
export class Socket {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成
  @Column({ type: "varchar", length: 255 })
  message: string;
  @Column({ type: "varchar", length: 255 })
  formName: string;
  @Column({ type: "int" })
  formId: number;
  @Column({ type: "varchar", length: 255, default: 'http://www.jy2002.love/assets/infourl-3lzKe2gJ.png' })
  formUrl: string;
  @Column({ type: "varchar", length: 255 })
  toName: string;
  @Column({ type: "int" })
  toId: number;
  @Column({ type: "varchar", length: 255, default: 'http://www.jy2002.love/assets/infourl-3lzKe2gJ.png' })
  toUrl: string;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP " })
  createTime: Date;
  @Column({ type: "varchar", length: 255, default: null })
  type: string;
  @Column({ type: "tinyint", default: 0 })
  status: number
}
