import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterModule } from './twitter/twitter.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
