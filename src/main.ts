import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS CONFIG
  app.enableCors({
    origin: 'http://localhost:3001', // frontend
    credentials: true, // permite cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
  });

  // Pipes globais (validação DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

app.use(cookieParser());
  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
