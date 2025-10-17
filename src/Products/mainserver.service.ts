import { Injectable, NotFoundException } from '@nestjs/common';
import { productsDB } from '../Model/bancoDados';
import { Product } from '../Model/productClass';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

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
  create(dto: CreateProductDto): Product {
    const maxId = this.products.length
      ? Math.max(...this.products.map((p) => p.id))
      : 1;

    const product = new Product(
      maxId + 1,
      dto.name,
      dto.price,
      dto.description || '',
      dto.imageUrl || ''
    );

    this.products.push(product);
    return product;
  }

  // ➤ Atualiza produto
  update(id: number, dto: UpdateProductDto): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Produto com ID ${id} não encontrado`);

    const current = this.products[index];
    const updated = new Product(
      id,
      dto.name ?? current.name,
      dto.price ?? current.price,
      dto.description ?? current.description,
      dto.imageUrl ?? current.imageUrl
    );

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
