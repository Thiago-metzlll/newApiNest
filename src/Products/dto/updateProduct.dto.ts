import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

/**
 * DTO para atualização completa do produto (PUT).
 * Como combinamos PUT, todos os campos são obrigatórios (exceto descrição).
 * Se preferir aceitar atualizações parciais, use PATCH com propriedades opcionais.
 */
export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string; // novo campo opcional para URL da imagem
}
