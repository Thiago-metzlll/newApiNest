import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';

/*
  ANTES:
  - productsDB (array em memória)
  - id manual
  - find / push / splice

  AGORA:
  - Banco de dados via Prisma
  - id autoincrement
  - create / findUnique / update / delete
  
*/

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // READ
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

  // CREATE
  async create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  // UPDATE
  async update(id: number, data: UpdateProductDto): Promise<Product> {
    await this.findOne(id); // garante que existe

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // DELETE
  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // garante que existe

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Produto removido com sucesso' };
  }

  // LÓGICA ANTIGA (ARRAY EM MEMÓRIA) — REFERÊNCIA
  /*
  private products: Product[] = productsDB;

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product)
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    return product;
  }

  create(data: CreateProductDto): Product {
    const maxId = this.products.length
      ? Math.max(...this.products.map((p) => p.id))
      : 0;

    const product: Product = {
      id: maxId + 1,
      ...data,
    };

    this.products.push(product);
    return product;
  }

  update(id: number, data: UpdateProductDto): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1)
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);

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
    if (index === -1)
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);

    this.products.splice(index, 1);
    return { message: 'Produto removido com sucesso' };
  }
  */
}
