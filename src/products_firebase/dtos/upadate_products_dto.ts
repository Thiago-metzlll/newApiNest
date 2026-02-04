import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create_products_dto';

export class UpdateProductDto extends PartialType(CreateProductDto) { }
