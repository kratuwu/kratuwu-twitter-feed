import { DynamicModule, Global, Module } from '@nestjs/common';
import Client from 'twitter-api-sdk';
import { TwitterApiProvider } from './twitter.providers';
import { TwitterService } from './twitter.service';
type TwitterModuleOptions = {
  imports?: any[];
  useFactory?: (...args: any[]) => string;
  inject?: any[];
};

const PROVIDERS = [TwitterService];
const EXPORTS = [...PROVIDERS];

@Global()
@Module({})
export class TwitterModule {
  static forRoot(options: TwitterModuleOptions): DynamicModule {
    return {
      module: TwitterService,
      imports: options.imports,
      providers: [
        {
          provide: TwitterApiProvider,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        TwitterService,
      ],
      exports: [...EXPORTS],
    };
  }
}
