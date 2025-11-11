// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrai token do cookie HttpOnly
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.cookieExtractor]),
      ignoreExpiration: false, // não ignora expiração
      secretOrKey: 'SEU_SEGREDO_SUPER_SECRETO_E_LONGO_123456', // usar variável de ambiente
    });
  }

  /**
   * Função que pega o token do cookie
   * @param req Request
   * @returns token ou null
   */
  private static cookieExtractor(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  /**
   * Valida o payload do token decodificado
   * Retorna o usuário que será adicionado em req.user
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}
