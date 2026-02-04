import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService {
    private db: FirebaseFirestore.Firestore;

    constructor(private config: ConfigService) {
        if (!admin.apps.length) {
            const keyPath = this.config.get<string>('FIREBASE_KEY_PATH');

            admin.initializeApp({
                credential: admin.credential.cert(
                    path.resolve(keyPath),
                ),
            });
        }

        this.db = admin.firestore();
    }

    getFirestore() {
        return this.db;
    }
}
