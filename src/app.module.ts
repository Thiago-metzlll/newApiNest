import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './Products/products.module';
import { FornecedoresModule } from './fornecedores/fornecedores.module';

@Module({
  imports: [ProductsModule, FornecedoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
