import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from './firestore/firestore.module';
import { TwitterModule } from './twitter/twitter.module';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        TWITTER_BEARER_TOKEN: Joi.string(),
      }),
    }),
    TwitterModule.forRoot({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('TWITTER_BEARER_TOKEN'),
      imports: [ConfigModule],
    }),
    FirestoreModule.forRoot({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        projectId: configService.get('GCP_PROJECT_ID'),
        clientEmail: configService.get('GOOGLE_CLIENT_EMAIL'),
        privateKey: configService.get('GOOGLE_PRIVATE_KEY'),
      }),
      imports: [ConfigModule],
    }),
    TweetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
