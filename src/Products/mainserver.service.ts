import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { productsDB } from '../Model/bancoDados';
import { Product } from '../Model/productClass';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
  // Referência ao "banco" simulado
  private products: Product[] = productsDB;

  findAll(): Product[] {
    // Aqui não é necessário try/catch, mas mantemos simples e direto
    return this.products;
  }

  findOne(id: number): Product {
    try {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }
      return product;
    } catch (error) {
      // Re-lançamos se já for uma exceção do Nest; caso contrário, convertemos em 500
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Erro ao buscar o produto');
    }
  }

  create(dto: CreateProductDto): Product {
    try {
      const maxId = this.products.reduce((acc, p) => (p.id > acc ? p.id : acc), 0);
      const newId = maxId + 1;
      const product = new Product(newId, dto.name, dto.price, dto.description);
      this.products.push(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar produto');
    }
  }

  update(id: number, dto: UpdateProductDto): Product {
    try {
      const index = this.products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }

      // Como combinamos PUT, substituímos o objeto por completo (mantendo id)
      const updated = new Product(id, dto.name, dto.price, dto.description);
      this.products[index] = updated;
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar produto');
    }
  }

  remove(id: number): { message: string } {
    try {
      const index = this.products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }
      this.products.splice(index, 1);
      return { message: 'Produto removido com sucesso' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Erro ao remover produto');
    }
  }
}