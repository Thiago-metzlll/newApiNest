import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';

/*
  EVOLUÇÃO DO SERVICE

  ANTES:
  - Array em memória
  - Estado volátil
  - Sem garantia de consistência

  AGORA:
  - Banco PostgreSQL
  - Prisma como ORM
  - Transações quando há risco de inconsistência (ACID)
*/

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  // =========================================================
  // READ — não precisa de transação (somente leitura)
  // =========================================================

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  // =========================================================
  // CREATE — transação preparada para crescimento futuro
  // =========================================================

  async create(data: CreateProductDto): Promise<Product> {
    /*
      Por enquanto:
      - apenas cria um produto

      Mas usando transação:
      - se amanhã você criar relações (supplier, log, auditoria),
        nada quebra
      - ou tudo salva, ou nada salva (Atomicidade)
    */
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data,
      });

      // Exemplo futuro:
      // await tx.productSupplier.create({ ... });

      return product;
    });
  }

  // =========================================================
  // UPDATE — leitura + escrita precisam ser consistentes
  // =========================================================

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    return this.prisma.$transaction(async (tx) => {
      /*
        A validação de existência e o update
        precisam estar no MESMO contexto transacional
      */

      const existing = await tx.product.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }

      const updated = await tx.product.update({
        where: { id },
        data,
      });

      return updated;
    });
  }

  // =========================================================
  // DELETE — envolve efeito cascata (ProductSupplier, UserProduct)
  // =========================================================

  async remove(id: number): Promise<{ message: string }> {
    return this.prisma.$transaction(async (tx) => {
      /*
        Aqui a transação é MUITO importante:

        - Product tem relações com:
          - product_suppliers
          - user_products
        - onDelete: Cascade depende de consistência
      */

      const existing = await tx.product.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }

      await tx.product.delete({
        where: { id },
      });

      return { message: 'Produto removido com sucesso' };
    });
  }

  // =========================================================
  // LÓGICA ANTIGA (ARRAY EM MEMÓRIA) — REFERÊNCIA HISTÓRICA
  // =========================================================
  /*
  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    return product;
  }

  create(data: CreateProductDto): Product {
    const maxId = this.products.length
      ? Math.max(...this.products.map((p) => p.id))
      : 0;

    const product: Product = {
      id: maxId + 1,
      ...data,
      stock: 10,
    };

    this.products.push(product);
    return product;
  }

  update(id: number, data: UpdateProductDto): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Produto com ID ${id} não encontrado`);

    const current = this.products[index];
    const updated: Product = {
      ...current,
      ...data,
    };

    this.products[index] = updated;
    return updated;
  }

  remove(id: number): { message: string } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Produto com ID ${id} não encontrado`);

    this.products.splice(index, 1);
    return { message: 'Produto removido com sucesso' };
  }
  */
}
