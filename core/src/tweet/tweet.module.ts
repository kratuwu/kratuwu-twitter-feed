import { Module } from '@nestjs/common';
import { LastTweetQueryRepository } from './lastQuery.repository';
import { TweetRepository } from './tweet.repository';
import { TweetService } from './tweet.service';

@Module({
  providers: [TweetService, TweetRepository, LastTweetQueryRepository],
  exports: [TweetService],
})
export class TweetModule {}
