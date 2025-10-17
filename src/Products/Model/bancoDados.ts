/**
 * Banco de dados simulado em memória.
 * Normalmente viria de um banco real (MySQL, Postgres, etc).
 */
import { Product } from './product.model';

export const productsDB: Product[] = [
  { id: 1, name: 'Camisa Básica', price: 49.90, description: 'Camisa 100% algodão' },
  { id: 2, name: 'Tênis Esportivo', price: 199.90, description: 'Ideal para corridas' },
  { id: 3, name: 'Calça Jeans', price: 129.90, description: 'Estilo slim' },
  { id: 4, name: 'Calça Jeans', price: 1.90, description: 'Estilo slim' },
];;

