import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [OrdersController, CartController],
    providers: [OrdersService, CartService, PrismaService],
    exports: [OrdersService, CartService],
})
export class OrdersModule { }
