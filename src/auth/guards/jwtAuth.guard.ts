// jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard para proteger rotas
 * Usa a Strategy JWT automaticamente para validar token
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
