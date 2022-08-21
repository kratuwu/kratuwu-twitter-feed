import { Injectable } from '@nestjs/common';
import { TweetRepository } from './tweet.repository';
import {
  tweetsRecentSearch,
  TwitterResponse,
  components,
} from 'twitter-api-sdk/dist/types';
import TweetDTO from './tweet.dto';
import { LastTweetQueryRepository } from './lastQuery.repository';
@Injectable()
export class TweetService {
  constructor(
    private readonly tweetRepository: TweetRepository,
    private readonly lastTweetQueryRepository: LastTweetQueryRepository,
  ) {}

  public async saveRecentTweet(
    tweets: TwitterResponse<tweetsRecentSearch>,
    query: string,
  ) {
    const tweetsDto: TweetDTO[] = tweets.data?.map(
      ({ id, text, author_id, attachments, created_at }) => ({
        id,
        query,
        authorId: author_id,
        text,
        authorUsername: this.findAuthorUserName(
          tweets.includes.users,
          author_id,
        ),
        mediaUrls: attachments.media_keys.map((key) => {
          const { type, url } = this.findMediaByKey(key, tweets.includes.media);
          return { type, url };
        }),
        createdAt: Date.parse(created_at),
      }),
    );
    await this.tweetRepository.create(tweetsDto);
    return await this.lastTweetQueryRepository.saveLastTweetQueryDocument(
      query,
      tweets.data?.[0]?.created_at,
    );
  }
  public getLastQueryCreatedAt(query: string): Promise<string> {
    return this.lastTweetQueryRepository.getLastQueryCreatedAt(query);
  }
  public countByQuery(query: string): Promise<number> {
    return this.tweetRepository.countByQuery(query);
  }
  private findAuthorUserName(
    users: components['schemas']['User'][],
    userId: string,
  ) {
    return users.find((user) => userId === user.id).username;
  }

  private findMediaByKey(
    key: string,
    medias: components['schemas']['Media'][],
  ): components['schemas']['Photo'] {
    const media = medias.find((media) => media.media_key === key);
    if (media.type === 'photo') {
      return media as components['schemas']['Photo'];
    } else {
      return media;
    }
  }
}
