import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  validateToken(token) {
    if (!token) {
      return false;
    }
    try {
      return this.jwtService.verify(token);
    } catch {
      return false;
    }
  }
}