import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
@Injectable()
// 响应拦截器
export class Response<T = any> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((res = {}) => {
      const { data = null, message = '请求成功' } = res
      if (data) {
        return {
          data,
          status: 200,
          success: true,
          message
        }
      }
      return {
        status: 200,
        success: true,
        message
      }
    }))
  }
}