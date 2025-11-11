// auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { LoginDto } from './auth.dto/login.dto';
import { RegisterDto } from './auth.dto/register.dto';
import type { User } from '../user/model/loginModel';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * LOGIN
   * 1. Verifica se o usuário existe pelo email.
   * 2. Compara a senha com hash armazenado.
   * 3. Gera token JWT (expira em 1h) com payload do usuário.
   * 4. Retorna token e usuário sem senha.
   */
  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const payload = { sub: user.id, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    // Retorna token e usuário sem senha
    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  /**
   * REGISTER
   * 1. Verifica se o email já existe.
   * 2. Criptografa a senha.
   * 3. Cria usuário no banco.
   * 4. Retorna usuário sem senha.
   */
  async register(data: RegisterDto): Promise<Omit<User, 'password'>> {
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
