import { Injectable, NestInterceptor, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './global.serice';
const config = require('../config')
const jwt = require('jsonwebtoken');
import { RedisService } from './redis'
@Injectable()
export class GlobalGuard implements NestInterceptor {
  constructor(private authService: AuthService,
    private readonly redisService: RedisService) { }
  async intercept(context: ExecutionContext, next): Promise<Observable<any>> {
    // 在这里执行全局守卫逻辑
    const request = context.switchToHttp().getRequest();
    // 从请求头中获取 token
    const token = request.headers['authorization'];
    // 请求的url，用于判断是否需要校验jwt
    const url = request.url;
    if (!config.whiteList.includes(url)) {
      // 需要鉴权才能访问的接口
      const validRes = this.authService.validateToken(token?.replace('Bearer', '').trim() || '');
      if (!validRes) {
        return next.handle().pipe(map(() => {
          // 如果没有提供令牌，返回错误响应或执行其他逻辑
          return new HttpException('无token或token无效', 401);
        }));
      }
    }
    if (token) {
      const newtoken = token?.replace('Bearer', '').trim()
      const user = jwt.verify(newtoken, config.jwtSecretKey);
      // 验证token是否有效
      const obj = await this.redisService.getValue(user.obj.username)
      if (obj !== newtoken) {
        return next.handle().pipe(map(() => {
          return new HttpException('异地登录，请重新登录', 401);
        }));
      }
    }
    // 不需要校验的接口、校验通过的接口直接放行
    return next.handle();
  }
}