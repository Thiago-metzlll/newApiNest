import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async addToCart(userId: string, productId: number, quantity: number) {
        const result = await this.prisma.userProduct.upsert({
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
        return { ...result, id: result.id.toString() };
    }

    async getCart(userId: string) {
        const items = await this.prisma.userProduct.findMany({
            where: { userId },
            include: { product: true },
        });
        return items.map(item => ({ ...item, id: item.id.toString() }));
    }

    async removeFromCart(userId: string, productId: number) {
        const result = await this.prisma.userProduct.delete({
            where: {
                userId_productId: { userId, productId },
            },
        });
        return { ...result, id: result.id.toString() };
    }

    async clearCart(userId: string) {
        return this.prisma.userProduct.deleteMany({
            where: { userId },
        });
    }
}
