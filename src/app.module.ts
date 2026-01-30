import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import necessário
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // permite usar process.env em qualquer módulo
    }),
    ProductsModule,
    FornecedoresModule,
    UsersModule,
    AuthModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
