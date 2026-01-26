import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service' ;
import { Supplier } from '@prisma/client';

/*
  =====================================================
  MODELO MENTAL
  -----------------------------------------------------
  ANTES:
  - Dados vinham de um array em memória (suppliers)
  - Tudo era síncrono
  - .find(), .push(), .filter()

  AGORA:
  - Dados vêm do banco via Prisma
  - Tudo é assíncrono
  - create / findUnique / update / delete
  =====================================================
*/

@Injectable()
export class FornecedoresService {
  constructor(private prisma: PrismaService) {}

  // =========================
  // READ
  // =========================

  // Retorna todos os fornecedores (antes: return this.fornecedores)
  async findAll(): Promise<Supplier[]> {
    return this.prisma.supplier.findMany();
  }

  // Retorna um fornecedor pelo ID
  async findOne(id: number): Promise<Supplier> {
    const fornecedor = await this.prisma.supplier.findUnique({
      where: { id },
    });

    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com id ${id} não encontrado`);
    }

    return fornecedor;
  }

  // =========================
  // CREATE
  // =========================

  /*
    Antes:
    - Gerava id com Date.now()
    - Dava push no array
  */
  async create(data: Omit<Supplier, 'id'>): Promise<Supplier> {
    return this.prisma.supplier.create({
      data,
    });
  }

  // =========================
  // UPDATE
  // =========================

  /*
    Antes:
    - Procurava índice no array
    - Fazia merge com spread (...)
  */
  async update(
    id: number,
    data: Partial<Omit<Supplier, 'id'>>,
  ): Promise<Supplier> {
    await this.findOne(id); // garante que existe

    return this.prisma.supplier.update({
      where: { id },
      data,
    });
  }

  // =========================
  // DELETE
  // =========================

  /*
    Antes:
    - filter() removendo do array
  */
  async remove(id: number): Promise<void> {
    await this.findOne(id); // garante que existe

    await this.prisma.supplier.delete({
      where: { id },
    });
  }

  // =====================================================
  // LÓGICA ANTIGA (ARRAY EM MEMÓRIA) — APENAS REFERÊNCIA
  // =====================================================

  /*
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

  update(
    id: number,
    updatedData: Partial<Fornecedor>,
  ): Fornecedor | undefined {
    const index = this.fornecedores.findIndex(f => f.id === id);
    if (index === -1) return undefined;

    this.fornecedores[index] = {
      ...this.fornecedores[index],
      ...updatedData,
    };

    return this.fornecedores[index];
  }
  */
}
