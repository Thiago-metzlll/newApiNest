import { Controller, Post, Body, Res, UseGuards, Get, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto/login.dto';
import { RegisterDto } from './auth.dto/register.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { token, user } = await this.authService.login(data);

    // ⚡ Cookie ajustado para dev
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // false em dev
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // lax em localhost
      maxAge: 3600 * 1000, // 1 hora
    });

    return { user, message: 'Login realizado com sucesso!' };
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.register(data);
    return { user, message: 'Usuário registrado com sucesso!' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return { user: req.user };
  }

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
