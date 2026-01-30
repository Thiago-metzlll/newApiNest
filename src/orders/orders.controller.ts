import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @UseGuards(JwtAuthGuard)
    @Post('checkout')
    async checkout(@Request() req) {
        // req.user.userId vem do JWT payload (definido no JwtStrategy.validate)
        return this.ordersService.checkout(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMyOrders(@Request() req) {
        return this.ordersService.getUserOrders(req.user.userId);
    }
}
