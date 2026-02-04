import { Module } from '@nestjs/common';
import { ProductsController } from './products_firebase.controller';
import { ProductsFirebaseService } from './products_firebase.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [FirebaseModule], // importa o Firebase
    controllers: [ProductsController],
    providers: [ProductsFirebaseService, PrismaService],
})
export class ProductsModule { }
