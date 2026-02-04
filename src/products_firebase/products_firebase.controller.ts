import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsFirebaseService } from './products_firebase.service';
import { CreateProductDto } from './dtos/create_products_dto';
import { UpdateProductDto } from './dtos/upadate_products_dto';

@Controller('products-firebase')
export class ProductsController {
    constructor(private readonly productsService: ProductsFirebaseService) { }

    @Post('sync')
    async sync() {
        return this.productsService.syncFromSupabase();
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}
