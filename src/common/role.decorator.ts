import { createParamDecorator, ExecutionContext, HttpException } from '@nestjs/common';
const jwt = require('jsonwebtoken');
const config = require('../config') // 配置文件
/**
 * 接口权限校验装饰器
 * role 该装饰器入参，接口的角色参数
 * ctx 装饰器的上下文，包含请求体等信息
 */
export const Role = createParamDecorator((roleList: string[], ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const Param = JSON.stringify(request.query) == '{}' ? request.body : request.query;
  const token = request.headers['authorization'].replace('Bearer', '').trim();
  // TODO 需要从缓存或数据库中读取用户数据，得到用户所属权限
  const obj = jwt.verify(token, config.jwtSecretKey);
  const UserRoleList = obj.obj.roleIds;
  function haveCommonElements(arr1: string[], arr2: string[]) {
    let set = new Set(arr1);
    for (let element of arr2) {
      if (set.has(element)) {
        return true;
      }
    }
    return false;
  }
  // 对比用户角色是否一致，不一致则抛出403
  if (!haveCommonElements(JSON.parse(UserRoleList), roleList)) {
    throw new HttpException('权限不足', 403);
  }
  return Param
});