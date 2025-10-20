/**
 * Banco de dados simulado em memória.
 * Normalmente viria de um banco real (MySQL, Postgres, etc).
 */
import { Product } from './product.model';

export const productsDB: Product[] = [
  { id: 1, name: 'Calça seminova Básica', price: 899999999.90, description: 'Calça 100% algodão', imageUrl: 'https://www.meupositivo.com.br/doseujeito/wp-content/uploads/2022/05/Calcas-mais-velhas-do-mundo-tem-3-mil-anos-2-1024x577.jpg' },
  
];;

