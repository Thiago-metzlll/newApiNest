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
import { ProductsService } from './mainserver.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products
  @Get()
  findAll() {
    try {
      return this.productsService.findAll();
    } catch (error) {
      throw new HttpException('Erro interno ao listar produtos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const productId = Number(id);
      if (Number.isNaN(productId)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      return this.productsService.findOne(productId);
    } catch (error) {
      // Se for HttpException (NotFoundException etc) deixa passar, senão converte
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erro interno ao buscar produto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // POST /products
  @Post()
  create(@Body() dto: CreateProductDto) {
    try {
      return this.productsService.create(dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erro interno ao criar produto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // PUT /products/:id  (atualização completa)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    try {
      const productId = Number(id);
      if (Number.isNaN(productId)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      return this.productsService.update(productId, dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erro interno ao atualizar produto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // DELETE /products/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const productId = Number(id);
      if (Number.isNaN(productId)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      return this.productsService.remove(productId);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erro interno ao remover produto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}