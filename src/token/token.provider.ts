// token.provider.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenProvider {
  // ⚠️ Substituir por variável de ambiente em produção
  private readonly secret = 'SEU_SEGREDO_SUPER_SECRETO_E_LONGO_123456';

  /**
   * Gera token JWT a partir de um payload (objeto com informações do usuário)
   * expira em 1 hora
   */
  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  /**
   * Verifica token JWT
   * Retorna payload decodificado se válido, ou null se inválido/expirado
   */
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      return null;
    }
  }
}
