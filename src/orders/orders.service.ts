import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    /**
     * Lógica de Checkout com Transação ACID
     * 1. Busca itens no carrinho (UserProduct)
     * 2. Inicia transação
     * 3. Para cada item: valida estoque, decrementa e cria OrderItem
     * 4. Cria a Order final
     * 5. Limpa o carrinho
     * Se houver erro em qualquer passo, o Prisma reverte tudo automaticamente.
     */
    async checkout(userId: string) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Buscar itens do carrinho
            const cartItems = await tx.userProduct.findMany({
                where: { userId },
                include: { product: true },
            });

            if (cartItems.length === 0) {
                throw new BadRequestException('Carrinho vazio');
            }

            let total = 0;

            // 2. Criar o pedido (Order) primeiro para ter o ID
            const order = await tx.order.create({
                data: {
                    userId,
                    total: 0, // Atualizaremos depois
                    status: 'COMPLETED',
                },
            });

            // 3. Processar cada item
            for (const item of cartItems) {
                const product = item.product;

                // VALIDAÇÃO E ATUALIZAÇÃO DE ESTOQUE (Consistência + Atomicidade)
                // Usamos o 'where' para garantir que o estoque não ficou negativo entre o read e o write
                try {
                    await tx.product.update({
                        where: {
                            id: product.id,
                            stock: { gte: item.quantity } // Só atualiza se houver estoque
                        },
                        data: { stock: { decrement: item.quantity } },
                    });
                } catch (error) {
                    throw new BadRequestException(
                        `Estoque insuficiente ou produto não encontrado: ${product.name}.`,
                    );
                }

                // CRIAR ITEM DO PEDIDO
                await tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        productId: product.id,
                        quantity: item.quantity,
                        price: product.price,
                    },
                });

                total += Number(product.price) * item.quantity;
            }

            // 4. Atualizar o total do pedido
            const finalOrder = await tx.order.update({
                where: { id: order.id },
                data: { total: total.toString() }, // Convertendo para string para o campo Decimal
                include: { items: { include: { product: true } } },
            });

            // 5. Limpar o carrinho (UserProduct)
            await tx.userProduct.deleteMany({
                where: { userId },
            });

            return finalOrder;
        });
    }

    async getUserOrders(userId: string) {
        return this.prisma.order.findMany({
            where: { userId },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
}
