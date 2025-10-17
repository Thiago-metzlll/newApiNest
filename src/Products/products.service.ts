import { Injectable, NotFoundException } from '@nestjs/common';
import { productsDB } from './Model/bancoDados';
import { Product } from './Model/product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = productsDB;

  // ➤ Lista todos os produtos
  findAll(): Product[] {
    return this.products;
  }

  // ➤ Busca por ID
  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    return product;
  }

  // ➤ Cria novo produto (em memória)
  create(data: Partial<Product>): Product {
    const maxId = this.products.length
      ? Math.max(...this.products.map((p) => p.id))
      : 0;

    const product: Product = {
      id: maxId + 1,
      name: data.name || 'Sem nome',
      price: data.price || 0,
      description: data.description || '',
      imageUrl: data.imageUrl || '',
    };

    this.products.push(product);
    return product;
  }

  // ➤ Atualiza produto
  update(id: number, data: Partial<Product>): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Produto com ID ${id} não encontrado`);

    const current = this.products[index];
    const updated: Product = {
      ...current,
      ...data, // sobrescreve os campos que vierem em data
    };

    this.products[index] = updated;
    return updated;
  }

  // ➤ Deleta produto
  remove(id: number): { message: string } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Produto com ID ${id} não encontrado`);

    this.products.splice(index, 1);
    return { message: 'Produto removido com sucesso' };
  }
}
