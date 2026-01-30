import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('user-products') // Rota que o frontend está esperando
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addToCart(@Request() req, @Body() data: { productId: number; quantity: number }) {
        return this.cartService.addToCart(req.user.userId, data.productId, data.quantity);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCart(@Request() req) {
        return this.cartService.getCart(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':productId')
    async removeFromCart(@Request() req, @Param('productId', ParseIntPipe) productId: number) {
        return this.cartService.removeFromCart(req.user.userId, productId);
    }
}
