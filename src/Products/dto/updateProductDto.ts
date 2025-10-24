import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './createProductDto';

// PartialType deixa todos os campos opcionais, ideal para update
export class UpdateProductDto extends PartialType(CreateProductDto) {}
