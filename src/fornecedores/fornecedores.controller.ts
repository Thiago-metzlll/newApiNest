import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
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

  @Put(':id')
update(@Param('id') id: string, @Body() fornecedor: Partial<Fornecedor>) {
  const updated = this.fornecedoresService.update(Number(id), fornecedor);
  if (!updated) return { message: 'Fornecedor não encontrado' };
  return updated;
}
}
