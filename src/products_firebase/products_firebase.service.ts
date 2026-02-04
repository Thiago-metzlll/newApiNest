// Esse é o novo service para integração com o firebase
import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateProductDto } from './dtos/create_products_dto';
import { UpdateProductDto } from './dtos/upadate_products_dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsFirebaseService {
    private productsCollection;

    constructor(
        private firebase: FirebaseService,
        private prisma: PrismaService
    ) {
        const db = this.firebase.getFirestore();
        this.productsCollection = db.collection('products');
    }

    // SYNC FROM SUPABASE
    async syncFromSupabase() {
        // Busca todos os produtos do Supabase (Prisma)
        const supabaseProducts = await this.prisma.product.findMany();

        const results = {
            totalDetected: supabaseProducts.length,
            synced: 0,
            errors: 0
        };

        for (const product of supabaseProducts) {
            try {
                // Verifica se já existe (opcional, aqui vamos apenas adicionar/atualizar)
                // Usamos o ID do Supabase como um campo de referência ou como ID do documento
                const docId = product.id.toString();

                await this.productsCollection.doc(docId).set({
                    name: product.name,
                    price: Number(product.price), // Decimal para Number
                    description: product.description,
                    imageUrl: product.imageUrl,
                    stock: product.stock,
                    supabaseId: product.id,
                    syncedAt: new Date()
                }, { merge: true });

                results.synced++;
            } catch (error) {
                console.error(`Erro ao sincronizar produto ${product.id}:`, error);
                results.errors++;
            }
        }

        return results;
    }

    // READ ALL
    async findAll() {
        const snapshot = await this.productsCollection.get();

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }

    // READ ONE
    async findOne(id: string) {
        const docRef = this.productsCollection.doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado`);
        }

        return {
            id: docSnap.id,
            ...docSnap.data(),
        };
    }

    // CREATE
    async create(data: CreateProductDto) {
        const docRef = await this.productsCollection.add({
            ...data,
            createdAt: new Date(),
        });

        return {
            id: docRef.id,
            ...data,
        };
    }

    // UPDATE
    async update(id: string, data: UpdateProductDto) {
        const docRef = this.productsCollection.doc(id);

        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado`);
        }

        await docRef.update({
            ...data,
            updatedAt: new Date(),
        });

        return {
            id,
            ...(await docRef.get()).data(),
        };
    }

    // DELETE
    async remove(id: string) {
        const docRef = this.productsCollection.doc(id);

        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado`);
        }

        await docRef.delete();

        return { message: 'Produto removido com sucesso' };
    }
}
