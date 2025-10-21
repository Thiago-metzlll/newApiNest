import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import type { Fornecedor } from './model/fornecedoresModel';

@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Get()
  findAll() {
    return this.fornecedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fornecedoresService.findOne(Number(id));
  }

  @Post()
  create(@Body() fornecedor: Fornecedor) {
    return this.fornecedoresService.create(fornecedor);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.fornecedoresService.remove(Number(id));
    return { message: 'Fornecedor removido com sucesso' };
  }
}
