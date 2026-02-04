import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService {
    private readonly logger = new Logger(FirebaseService.name);
    private db: FirebaseFirestore.Firestore;

    constructor(private config: ConfigService) {
        if (!admin.apps.length) {
            const serviceAccountJson = this.config.get<string>('FIREBASE_SERVICE_ACCOUNT');

            if (serviceAccountJson) {
                // Se o JSON completo estiver na variável de ambiente (recomendado para Vercel)
                try {
                    const serviceAccount = JSON.parse(serviceAccountJson);

                    // Garante que as quebras de linha na private_key sejam interpretadas corretamente
                    if (serviceAccount.private_key) {
                        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
                    }

                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount),
                    });
                } catch (error: any) {
                    this.logger.error('❌ Erro ao inicializar Firebase com SERVICE_ACCOUNT:', error.message);
                    throw new Error(`Failed to initialize Firebase: ${error.message}`);
                }
            } else {
                // Fallback para o arquivo físico (local)
                const keyPath = this.config.get<string>('FIREBASE_KEY_PATH');

                if (!keyPath) {
                    throw new Error('Neither FIREBASE_SERVICE_ACCOUNT nor FIREBASE_KEY_PATH is defined');
                }

                admin.initializeApp({
                    credential: admin.credential.cert(
                        path.resolve(keyPath),
                    ),
                });
            }
        }

        this.db = admin.firestore();
    }

    getFirestore() {
        return this.db;
    }
}
