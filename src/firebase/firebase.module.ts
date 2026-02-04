import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({
    providers: [FirebaseService],
    exports: [FirebaseService], // permite outros módulos usarem
})
export class FirebaseModule { }
