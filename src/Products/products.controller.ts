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
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from './Model/product.model';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    // O ParseIntPipe garante que 'id' seja número válido
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateProductDto): Product {
    return this.productsService.create(data);
  }

  
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ): Product {
    return this.productsService.update(id, data);
  }

  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
