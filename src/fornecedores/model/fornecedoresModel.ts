export interface Fornecedor {
  id: number;
  name: string;
  email: string;
  description?: string;
  imageUrl?: string; // novo campo opcional
  city: string;
}