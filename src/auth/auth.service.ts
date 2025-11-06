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
   * Verifica o email, confere o hash da senha e retorna o token JWT.
   */
  async login(data: LoginDto) {
    const user = this.usersService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    // Retorna o token e o usuário sem a senha
    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  /**
   * REGISTER
   * Cria o usuário com senha criptografada e gera um token JWT.
   */
  async register(data: RegisterDto): Promise<Omit<User, 'password'>> {
    const existingUser = this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email já cadastrado.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    const { password, ...result } = newUser;
    return result;
  }
}
