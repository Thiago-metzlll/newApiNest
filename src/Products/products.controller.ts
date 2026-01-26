import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    // O ParseIntPipe garante que 'id' seja número válido
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productsService.create(data);
  }


  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, data);
  }


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
