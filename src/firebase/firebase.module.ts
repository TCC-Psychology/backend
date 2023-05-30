import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './psychologist-app-2e2d5-firebase-adminsdk-qvebw-9f1e6b3aa3.json';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

@Module({
  providers: [
    {
      provide: 'FIREBASE',
      useValue: admin.initializeApp({
        credential: admin.credential.cert(firebase_params),
      }),
    },
  ],
  exports: ['FIREBASE'],
})
export class FirebaseModule {}
