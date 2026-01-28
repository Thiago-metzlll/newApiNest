const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🗑️ Dropping existing tables in public schema...');

        // Ordem importa por causa das FKs
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "public"."user_products" CASCADE;`);
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "public"."product_suppliers" CASCADE;`);
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "public"."order_items" CASCADE;`);
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "public"."orders" CASCADE;`);
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "public"."users" CASCADE;`);
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "public"."suppliers" CASCADE;`);
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "public"."products" CASCADE;`);

        console.log('✅ Tables dropped successfully!');
    } catch (error) {
        console.error('❌ Error dropping tables:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
