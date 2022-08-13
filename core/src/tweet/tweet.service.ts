import { Injectable } from '@nestjs/common';
import { TweetRepository } from './tweet.repository';
import {
  tweetsRecentSearch,
  TwitterResponse,
  components,
} from 'twitter-api-sdk/dist/types';
import TweetDTO from './tweet.dto';
@Injectable()
export class TweetService {
  constructor(private readonly tweetRepository: TweetRepository) {}

  public saveRecentTweet(
    tweets: TwitterResponse<tweetsRecentSearch>,
    query: string,
  ) {
    const tweetsDto: TweetDTO[] = tweets.data.map(
      ({ id, text, author_id, attachments }) => ({
        id,
        query,
        authorId: author_id,
        text,
        authorName: this.findAuthorName(tweets.includes.users, author_id),
        mediaUrls: attachments.media_keys.map((key) => {
          const { type, url } = this.findMediaByKey(key, tweets.includes.media);
          return { type, url };
        }),
      }),
    );
    this.tweetRepository.create(tweetsDto);
  }

  private findAuthorName(
    users: components['schemas']['User'][],
    userId: string,
  ) {
    return users.find((user) => userId === user.id).name;
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
