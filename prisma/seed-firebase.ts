import * as admin from 'firebase-admin';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Carrega variáveis de ambiente do .env
dotenv.config();

async function seedFirebase() {
    console.log('🚀 Iniciando Seed Isolado do Firebase...');

    const keyPath = process.env.FIREBASE_KEY_PATH;

    if (!keyPath) {
        throw new Error('FIREBASE_KEY_PATH não definido no .env');
    }

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(path.resolve(keyPath)),
        });
    }

    const db = admin.firestore();
    const productsCollection = db.collection('products');

    const seedData = [
        {
            name: 'Cadeira Gamer Hydra',
            price: 1250.00,
            description: 'Cadeira ergonômica com revestimento em couro sintético e ajuste de 180 graus.',
            imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fce62?q=80&w=800',
            stock: 12,
            category: 'Móveis',
            isFirebaseExclusive: true,
            createdAt: new Date()
        },
        {
            name: 'Teclado Mecânico RGB',
            price: 450.00,
            description: 'Switch Blue, anti-ghosting total e iluminação customizável por software.',
            imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800',
            stock: 25,
            category: 'Periféricos',
            isFirebaseExclusive: true,
            createdAt: new Date()
        },
        {
            name: 'Monitor UltraWide 34"',
            price: 2800.00,
            description: 'Resolução 3440x1440px, 144Hz e suporte a HDR10.',
            imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800',
            stock: 8,
            category: 'Hardware',
            isFirebaseExclusive: true,
            createdAt: new Date()
        }
    ];

    for (const product of seedData) {
        try {
            // Usamos add() para criar um ID automático do Firestore
            const docRef = await productsCollection.add(product);
            console.log(`✅ Produto "${product.name}" inserido com ID: ${docRef.id}`);
        } catch (error) {
            console.error(`❌ Erro ao inserir "${product.name}":`, error);
        }
    }

    console.log('🎯 Seed do Firebase finalizado!');
    process.exit(0);
}

seedFirebase().catch((err) => {
    console.error('💥 Erro crítico no seed:', err);
    process.exit(1);
});
