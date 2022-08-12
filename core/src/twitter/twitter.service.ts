import { Inject, Injectable } from '@nestjs/common';
import Client from 'twitter-api-sdk';
import {
  tweetsRecentSearch,
  TwitterPaginatedResponse,
  TwitterResponse,
} from 'twitter-api-sdk/dist/types';
import { TwitterApiProvider } from './twitter.providers';

@Injectable()
export class TwitterService {
  private client: Client;
  constructor(@Inject(TwitterApiProvider) twitterApiToken: string) {
    this.client = new Client(twitterApiToken);
  }
  public async queryTweetsFromTag(
    tag: string,
  ): Promise<TwitterPaginatedResponse<TwitterResponse<tweetsRecentSearch>>> {
    return this.client.tweets.tweetsRecentSearch({ query: `#${tag}` });
  }
}
