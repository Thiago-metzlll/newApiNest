// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { LoginDto } from './auth.dto/login.dto';
import { RegisterDto } from './auth.dto/register.dto';
import type { User } from '../user/model/loginModel';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(data: LoginDto) {
    const user = this.usersService.findByEmail(data.email);
    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }

  register(data: RegisterDto): User {
    if (this.usersService.findByEmail(data.email)) {
      throw new UnauthorizedException('Email já cadastrado.');
    }
    return this.usersService.create(data);
  }
}
