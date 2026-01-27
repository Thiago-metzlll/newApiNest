import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async addToCart(userId: string, productId: number, quantity: number) {
        return this.prisma.userProduct.upsert({
            where: {
                userId_productId: { userId, productId },
            },
            update: {
                quantity: { increment: quantity },
            },
            create: {
                userId,
                productId,
                quantity,
            },
        });
    }

    async getCart(userId: string) {
        return this.prisma.userProduct.findMany({
            where: { userId },
            include: { product: true },
        });
    }

    async removeFromCart(userId: string, productId: number) {
        return this.prisma.userProduct.delete({
            where: {
                userId_productId: { userId, productId },
            },
        });
    }

    async clearCart(userId: string) {
        return this.prisma.userProduct.deleteMany({
            where: { userId },
        });
    }
}
