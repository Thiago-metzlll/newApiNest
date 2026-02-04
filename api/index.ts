import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup';

let cachedApp: any;

export default async function handler(req: any, res: any) {
    if (!cachedApp) {
        try {
            const app = await NestFactory.create(AppModule);
            setupApp(app);
            await app.init();
            cachedApp = app.getHttpAdapter().getInstance();
        } catch (error: any) {
            console.error('❌ CRASH NO BOOTSTRAP:', error);
            // Retorna o erro no corpo para ajudar no debug (APENAS DURANTE DEBUG)
            return res.status(500).json({
                message: 'Erro ao iniciar aplicação',
                error: error.message,
                stack: error.stack
            });
        }
    }
    return cachedApp(req, res);
}
