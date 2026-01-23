// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { LoginDto } from './auth.dto/login.dto';
import { RegisterDto } from './auth.dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import type { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // LOGIN
  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    const { password, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  // REGISTER

  async register(
    data: RegisterDto,
  ): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersService.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictException('Email já cadastrado.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    const { password, ...result } = newUser;
    return result;
  }
}
