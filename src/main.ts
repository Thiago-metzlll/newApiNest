import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://ecommerce-front-55cr.vercel.app/',
    ],
    credentials: true,
  });

  setupApp(app);

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}

bootstrap();
