import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('ev_menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成
  @Column({ type: "int", default: 0 })
  pid: number;
  @Column({ type: "varchar", length: 255 , nullable: true })
  path: string;
  @Column({ type: "varchar", length: 255 , nullable: true })
  component: string;
  @Column({ type: "varchar", length: 255, nullable: true })
  redirect: string;
  @Column({ type: "int", default: 0 })
  type: string;
  @Column({ type: "varchar", length: 255, nullable: true })
  title: string;
  @Column({ type: "varchar", length: 255, nullable: true })
  svgIcon: string;
  @Column({ type: "varchar", length: 255, nullable: true })
  icon: string;
  @Column({ type: 'tinyint', nullable: true })
  keepAlive: boolean;
  @Column({ type: 'tinyint', nullable: true })
  hidden: number;
  @Column({ type: "varchar", length: 255, nullable: true })
  sort: string;
  @Column({ type: "varchar", length: 255, nullable: true })
  activeMenu: string;
  @Column({ type: 'tinyint', nullable: true })
  breadcrumb: number;
  @Column({ type: "int", default: 0, nullable: true })
  status: string;
  @Column({ type: "mediumtext", nullable: true })
  roles: string;
  @Column({ type: "varchar", length: 255, nullable: true })
  permission: string;
  @Column({ type: 'tinyint', nullable: true })
  showInTabs: number;
  @Column({ type: 'tinyint', nullable: true })
  alwaysShow: number;
  @Column({ type: 'tinyint', nullable: true })
  affix: number;
}