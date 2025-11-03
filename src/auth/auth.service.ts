// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { LoginDto } from './auth.dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  login(data: LoginDto) {
    const user = this.usersService.findByEmail(data.email);
    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Normalmente aqui você geraria um JWT, mas vamos simular
    const { password, ...result } = user;
    return {
      message: 'Login bem-sucedido!',
      user: result,
      token: 'fake-jwt-token',
    };
  }
}
