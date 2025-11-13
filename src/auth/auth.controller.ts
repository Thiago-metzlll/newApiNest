// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, UseGuards, Get, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto/login.dto';
import { RegisterDto } from './auth.dto/register.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * LOGIN
   * 1. Recebe email e senha do usuário.
   * 2. Chama AuthService.login que valida e gera JWT.
   * 3. Envia JWT em cookie HttpOnly para maior segurança.
   */
  @Post('login')
  async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { token, user } = await this.authService.login(data);

    // Cria cookie HttpOnly com token
    res.cookie('access_token', token, {
      httpOnly: true,      // não acessível via JS
      secure: process.env.NODE_ENV === 'production', // só HTTPS em produção
      sameSite: 'strict',  // protege contra CSRF
      maxAge: 3600 * 1000, // 1 hora
    });

    // Retorna usuário sem senha (token está no cookie)
    return { user, message: 'Login realizado com sucesso!' };
  }

  /**
   * REGISTER
   * 1. Recebe dados do usuário.
   * 2. Chama AuthService.register que cria usuário.
   * 3. Retorna usuário criado sem senha.
   */
  @Post('register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.register(data);
    return { user, message: 'Usuário registrado com sucesso!' };
  }

  /**
   * PROFILE (rota protegida)
   * 1. Usa JwtAuthGuard para validar token JWT no cookie.
   * 2. Retorna informações do usuário armazenadas em req.user.
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    // req.user é preenchido automaticamente pelo JwtStrategy
    return { user: req.user };
  }

  /**
 * LOGOUT
 * 1. Limpa o cookie 'access_token'.
 * 2. Retorna mensagem de sucesso.
 */
@Post('logout')
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });

  return { message: 'Logout realizado com sucesso!' };
}

}
