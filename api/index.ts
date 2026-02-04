import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup';

let cachedApp: any;

export default async function handler(req: any, res: any) {
    if (!cachedApp) {
        const app = await NestFactory.create(AppModule);
        setupApp(app);
        await app.init();
        cachedApp = app.getHttpAdapter().getInstance();
    }
    cachedApp(req, res);
}
