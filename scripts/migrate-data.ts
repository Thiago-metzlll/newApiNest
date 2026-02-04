import { PrismaClient } from '@prisma/client';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carregar .env da pasta src
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

const prisma = new PrismaClient();

async function migrate() {
    console.log('🚀 Iniciando migração de dados...');

    // 1. Inicializar Firebase
    const keyPath = path.resolve(__dirname, '../src/config/firebase-key.json');
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(keyPath),
        });
    }
    const db = admin.firestore();
    const productsCollection = db.collection('products');

    try {
        // 2. Buscar produtos do Supabase
        console.log('📡 Buscando produtos no Supabase...');
        const products = await prisma.product.findMany();
        console.log(`✅ Encontrados ${products.length} produtos.`);

        // 3. Sincronizar com Firebase
        let synced = 0;
        for (const product of products) {
            const docId = product.id.toString();
            await productsCollection.doc(docId).set({
                name: product.name,
                price: Number(product.price),
                description: product.description,
                imageUrl: product.imageUrl,
                stock: product.stock,
                supabaseId: product.id,
                syncedAt: new Date(),
                migratedVia: 'standalone-script'
            }, { merge: true });
            synced++;
            process.stdout.write(`\r[${synced}/${products.length}] Sincronizando: ${product.name}...`);
        }

        console.log('\n\n✨ Migração concluída com sucesso!');
        console.log(`📦 Total sincronizado: ${synced}`);

    } catch (error) {
        console.error('\n❌ Erro durante a migração:', error);
    } finally {
        await prisma.$disconnect();
    }
}

migrate();
