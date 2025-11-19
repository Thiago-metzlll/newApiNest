import { Injectable } from '@nestjs/common';
import { Fornecedor } from './model/fornecedoresModel';
import { suppliers } from './model/fornecedoresBancoDados';

@Injectable()
export class FornecedoresService {
  private fornecedores = suppliers;

  findAll(): Fornecedor[] {
    return this.fornecedores;
  }

  findOne(id: number): Fornecedor | undefined {
    return this.fornecedores.find(f => f.id === id);
  }

  create(fornecedor: Fornecedor): Fornecedor {
  const { id, ...rest } = fornecedor;
  const newFornecedor = { id: Date.now(), ...rest };
  this.fornecedores.push(newFornecedor);
  return newFornecedor;
}


  remove(id: number): void {
    this.fornecedores = this.fornecedores.filter(f => f.id !== id);
  }

  update(id: number, updatedData: Partial<Fornecedor>): Fornecedor | undefined {
  const index = this.fornecedores.findIndex(f => f.id === id);
  if (index === -1) return undefined;

  
  this.fornecedores[index] = { ...this.fornecedores[index], ...updatedData };
  return this.fornecedores[index];
}

}
