import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { join } from 'path'
import * as express from 'express'; // 导入 Express 模块
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { createServer } from 'http';
import { WebSocketServer } from './websocket/ws-server'; // ✅ 自定义 WebSocket 服务
const moment = require('moment')
import * as crypto from 'crypto';

if (!globalThis.crypto) {
  (globalThis as any).crypto = crypto;
}
Date.prototype.toISOString = function () {
  return moment(this).format('YYYY-MM-DD HH:mm:ss')
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api'); // 设置全局前缀
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new Response()) // 设置全局响应拦截器
  app.useGlobalFilters(new HttpFilter()) // 设置全局异常拦截器
  app.enableCors()
  app.use('/img', express.static(join(__dirname, '../uploads')));
  app.use('/files', express.static(join(__dirname, '../uploads')));
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('admin接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
    // ✅ 创建原生 HTTP Server 实例
  const httpServer = createServer(app.getHttpAdapter().getInstance());
  await app.init(); // 重要：初始化 Nest 应用，否则接口无法响应

  // ✅ 初始化 WebSocket 服务并注入 Nest 应用容器
  const wsServer = new WebSocketServer(httpServer);
  await wsServer.bind(app); // 绑定 Nest 应用用于依赖注入

  await new Promise<void>((resolve) => httpServer.listen(8888, resolve));
  console.log('HTTP + WebSocket server running on http://localhost:8888');
  // await app.listen(8888);
}
bootstrap();
