import { DynamicModule, Module } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import {
  FirestoreDatabaseProvider,
  FirestoreOptionsProvider,
  FirestoreCollectionProviders,
} from './firestore.providers';
import { FirestoreCredentials } from './firestore.interface';

type FirestoreModuleOptions = {
  imports?: any[];
  useFactory?: (...args: any[]) => FirestoreCredentials;
  inject?: any[];
};

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const optionsProvider = {
      provide: FirestoreOptionsProvider,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    const dbProvider = {
      provide: FirestoreDatabaseProvider,
      useFactory: (config: FirestoreCredentials) =>
        new Firestore({
          projectId: config.projectId,
          credentials: {
            client_email: config.clientEmail,
            private_key: config.privateKey?.replace(/\\n/g, '\n'),
          },
        }),
      inject: [FirestoreOptionsProvider],
    };
    const collectionProviders = FirestoreCollectionProviders.map(
      (providerName) => ({
        provide: providerName,
        useFactory: (db: Firestore) => db.collection(providerName),
        inject: [FirestoreDatabaseProvider],
      }),
    );
    return {
      global: true,
      module: FirestoreModule,
      imports: options.imports,
      providers: [optionsProvider, dbProvider, ...collectionProviders],
      exports: [dbProvider, ...collectionProviders],
    };
  }
}
