import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Reset (optional - be careful in production!)
    // await prisma.product.deleteMany();
    // await prisma.supplier.deleteMany();

    // Create Suppliers
    const supplier1 = await prisma.supplier.create({
        data: {
            name: 'Tech Distribuidora',
            email: 'contato@techdistribuidora.com',
            city: 'São Paulo',
        },
    });

    const supplier2 = await prisma.supplier.create({
        data: {
            name: 'Moda Global',
            email: 'contato@modaglobal.com',
            city: 'Rio de Janeiro',
        },
    });

    // Create Products
    const products = [
        {
            name: 'Smartphone X',
            price: 1999.90,
            description: 'Smartphone de última geração com 128GB de armazenamento, câmera tripla de 50MP e tela Super AMOLED de 120Hz.',
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800',
            stock: 50,
            productSuppliers: {
                create: { supplierId: supplier1.id }
            }
        },
        {
            name: 'Notebook Pro',
            price: 4500.00,
            description: 'Notebook potente para desenvolvedores com Processador i7, 32GB de RAM e SSD de 1TB NVMe.',
            imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800',
            stock: 30,
            productSuppliers: {
                create: { supplierId: supplier1.id }
            }
        },
        {
            name: 'Camiseta Básica',
            price: 49.90,
            description: 'Camiseta algodão 100% premium, corte slim fit e disponível em várias cores.',
            imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800',
            stock: 100,
            productSuppliers: {
                create: { supplierId: supplier2.id }
            }
        },
        {
            name: 'Tênis Esportivo',
            price: 299.90,
            description: 'Tênis para corrida alta performance com tecnologia de amortecimento e tecido respirável.',
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
            stock: 45,
            productSuppliers: {
                create: { supplierId: supplier2.id }
            }
        }
    ];

    for (const p of products) {
        await prisma.product.create({ data: p });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
