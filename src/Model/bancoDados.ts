/**
 * Banco de dados simulado em memória.
 * Normalmente viria de um banco real (MySQL, Postgres, etc).
 */
import { Product } from './productClass';

export const productsDB: Product[] = [
  new Product(1, 'Camisa Básica', 49.90, 'Camisa 100% algodão'),
  new Product(2, 'Tênis Esportivo', 199.90, 'Ideal para corridas'),
  new Product(3, 'Calça Jeans', 129.90, 'Estilo slim'),
];
