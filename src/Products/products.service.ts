import { Injectable, NotFoundException } from '@nestjs/common';
import { productsDB } from './Model/bancoDados';
import { Product } from './Model/product.model';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';

@Injectable()
export class ProductsService {
  private products: Product[] = productsDB;

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
}
