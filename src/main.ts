import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // <--- Adicione esta linha

  // ValidationPipe habilita validação via DTO (class-validator)
  // transform: true -> converte payloads (strings -> numbers) quando possível
  // whitelist: true -> remove propriedades não declaradas nos DTOs
  // forbidNonWhitelisted: true -> lança erro se houver propriedades extras
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
