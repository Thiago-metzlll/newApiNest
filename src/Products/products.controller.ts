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


/**
 * Controller de produtos.
 * Responsável por receber requisições HTTP relacionadas a produtos
 * e repassá-las para o ProductsService.
 */

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Lista todos os produtos.
   * GET /products
   * @returns Array de produtos
   */
  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  /**
   * Busca um produto pelo ID.
   * GET /products/:id
   * @param id - ID do produto (validação automática com ParseIntPipe)
   * @returns Produto encontrado
   * @throws NotFoundException se o produto não existir
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    // O ParseIntPipe garante que 'id' seja número válido
    return this.productsService.findOne(id);
  }

  /**
   * Cria um novo produto.
   * POST /products
   * @param data - Corpo da requisição validado pelo CreateProductDto
   * @returns Produto criado
   * @throws BadRequestException se os dados forem inválidos (ValidationPipe global)
   */
  @Post()
  create(@Body() data: CreateProductDto): Product {
    return this.productsService.create(data);
  }

  /**
   * Atualiza um produto existente.
   * PUT /products/:id
   * @param id - ID do produto (validação com ParseIntPipe)
   * @param data - Dados para atualizar (UpdateProductDto)
   * @returns Produto atualizado
   * @throws NotFoundException se o produto não existir
   * @throws BadRequestException se os dados forem inválidos
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ): Product {
    return this.productsService.update(id, data);
  }

  /**
   * Remove um produto pelo ID.
   * DELETE /products/:id
   * @param id - ID do produto (ParseIntPipe garante número válido)
   * @returns Mensagem de sucesso
   * @throws NotFoundException se o produto não existir
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
