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
    query: string,
    endTime?: string,
  ): Promise<TwitterResponse<tweetsRecentSearch>> {
    const tweets = await this.fetchTweets(query, endTime);
    while (tweets.meta.next_token) {
      const { data, includes, meta } = await this.fetchTweets(
        query,
        tweets.meta.next_token,
      );
      tweets.data.push(...data);
      tweets.includes.media.push(...includes.media);
      tweets.includes.users.push(...includes.users);
      tweets.meta = meta;
    }
    return tweets;
  }

  private fetchTweets(
    query: string,
    startTime?: string,
  ): TwitterPaginatedResponse<TwitterResponse<tweetsRecentSearch>> {
    const startAt = startTime
      ? new Date(Date.parse(startTime) + 1000).toISOString()
      : undefined;
    return this.client.tweets.tweetsRecentSearch({
      query: `(${query}) -is:retweet has:images`,
      max_results: 100,
      expansions: ['author_id', 'attachments.media_keys'],
      'media.fields': [
        'media_key',
        'preview_image_url',
        'type',
        'url',
        'width',
        'alt_text',
      ],
      'tweet.fields': ['created_at'],
      start_time: startAt,
    });
  }
}
