import { Inject, Injectable } from '@nestjs/common';
import Client from 'twitter-api-sdk';
import {
  tweetsRecentSearch,
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
    query: string,
  ): Promise<TwitterResponse<tweetsRecentSearch>> {
    return await this.client.tweets.tweetsRecentSearch({
      query: `(${query}) -is:retweet has:images`,
      expansions: ['author_id', 'attachments.media_keys'],
      'media.fields': [
        'media_key',
        'preview_image_url',
        'type',
        'url',
        'width',
        'alt_text',
      ],
    });
  }
}
