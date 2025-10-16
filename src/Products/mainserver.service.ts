import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { productsDB } from '../Model/bancoDados';
import { Product } from '../Model/productClass';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private products: Product[] = productsDB;
  private filePath = path.join(process.cwd(), 'src/Model/products.json');

  constructor() {
    this.loadFromFile();
  }

  /** Carrega dados do arquivo JSON, se existir */
  private loadFromFile() {
    try {
      if (fs.existsSync(this.filePath)) {
        const json = fs.readFileSync(this.filePath, 'utf-8');
        this.products = JSON.parse(json).map(
          (p: any) => new Product(p.id, p.name, p.price, p.description)
        );
      }
    } catch (error) {
      console.error('Erro ao carregar produtos do JSON:', error);
    }
  }

  /** Salva os produtos no arquivo JSON, criando a pasta se necessário */
  private saveToFile() {
    try {
      const dir = path.dirname(this.filePath);

      // cria diretório se não existir
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (error) {
      console.error('Erro ao salvar produtos no JSON:', error);
    }
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    return product;
  }

  create(dto: CreateProductDto): Product {
    const maxId = this.products.reduce((acc, p) => (p.id > acc ? p.id : acc), 0);
    const newId = maxId + 1;
    const product = new Product(newId, dto.name, dto.price, dto.description);
    this.products.push(product);

    this.saveToFile(); // salva no JSON
    return product;
  }

  update(id: number, dto: UpdateProductDto): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Produto com ID ${id} não encontrado`);

    const updated = new Product(id, dto.name, dto.price, dto.description);
    this.products[index] = updated;

    this.saveToFile(); // salva no JSON
    return updated;
  }

  remove(id: number): { message: string } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Produto com ID ${id} não encontrado`);

    this.products.splice(index, 1);

    this.saveToFile(); // salva no JSON
    return { message: 'Produto removido com sucesso' };
  }
}
