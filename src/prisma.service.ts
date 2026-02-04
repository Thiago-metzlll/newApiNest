import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    const dbUrl = process.env.DATABASE_URL;
    const directUrl = process.env.DIRECT_URL;

    if (!dbUrl) {
      this.logger.error('❌ DATABASE_URL is missing from environment variables!');
    } else if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
      this.logger.error('❌ DATABASE_URL must start with postgresql:// or postgres://. Current value starts with: ' + dbUrl.substring(0, 10));
    }

    try {
      await this.$connect();
      this.logger.log('✅ Prisma conectado ao banco de dados');
    } catch (error: any) {
      this.logger.error('❌ Erro ao conectar Prisma:', error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma desconectado');
  }
}


