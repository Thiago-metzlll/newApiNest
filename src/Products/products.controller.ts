import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from './Model/product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    const productId = Number(id);
    if (Number.isNaN(productId)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() data: Partial<Product>): Product {
    return this.productsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Product>): Product {
    const productId = Number(id);
    if (Number.isNaN(productId)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    return this.productsService.update(productId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const productId = Number(id);
    if (Number.isNaN(productId)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    return this.productsService.remove(productId);
  }
}
