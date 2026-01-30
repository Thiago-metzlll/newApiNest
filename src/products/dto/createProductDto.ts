import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  name!: string;

  @IsNumber()
  @Min(0, { message: 'O preço deve ser um número positivo.' })
  price!: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl({}, { message: 'A URL da imagem deve ser válida.' })
  @IsOptional()
  imageUrl?: string;
}
