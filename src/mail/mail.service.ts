// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 587,
      secure: true, // true for 465, false for 587
      auth: {
        user: '18898159853@163.com', // 你的163邮箱
        pass: 'RWdstZK9EUez7dn5' // ⚠️ 注意：不是邮箱密码，是网易生成的授权码
      }
    });
  }

  async sendAlertMail(cpu: string, mem: string, disk: string) {
    console.log(`发送告警邮件：CPU ${cpu}%, 内存 ${mem}%, 磁盘 ${disk}%`);

    const mailOptions = {
      from: '"系统监控" <18898159853@163.com>',
      to: '18898159853@163.com', // 或设置一个统一显示的地址，也可以是 yourself
      bcc: '18898159853@163.com,3034365236@qq.com', // 这里是真正接收的所有地址
      subject: '⚠️ 服务器资源告警',
      text: `⚠️ 系统资源告警：
      CPU 使用率：${cpu}%
      内存使用率：${mem}%
      磁盘使用率：${disk}%`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('📧 告警邮件发送成功');
    } catch (error) {
      console.error('❌ 发送邮件失败：', error.message);
    }
  }
}
