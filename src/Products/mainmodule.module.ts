import { Module } from '@nestjs/common';
import { ProductsController } from './maincontroller.controller';
import { ProductsService } from './mainserver.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
